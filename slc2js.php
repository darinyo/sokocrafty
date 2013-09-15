<?php

class ConvertSLCToJs
{
    private $fileSource;
    private $fileTarget;

    const EXTENSION_LEVEL_XML = '.slc';
    const EXTENSION_JS = '.js';

    const SLC_CHAR_PLAYER_MAP   = "@";
    const SLC_CHAR_WALL_MAP     = "#";
    const SLC_CHAR_EMPTY_MAP    = " ";
    const SLC_CHAR_BOX_MAP      = "$";
    const SLC_CHAR_MARK_MAP     = ".";
    const SLC_CHAR_BOX_MARK_MAP = "*";

    const JS_CHAR_WALL_MAP      = 1;
    const JS_CHAR_EMPTY_MAP     = 0;
    const JS_CHAR_BOX_MAP       = 3;
    const JS_CHAR_MARK_MAP      = 2;

    private function initParams()
    {
        $options = "s:d::";
        $arrParams = getopt($options);

        if (count($arrParams) && $arrParams['s']) {
            $this->fileSource = $arrParams['s'];
        }

        if (count($arrParams) && $arrParams['d']) {
            $this->fileTarget = $arrParams['d'];
        } else {
            $this->fileTarget = str_replace(self::EXTENSION_LEVEL_XML, self::EXTENSION_JS, $this->fileSource);
        }
    }

    private function canConvertFiles()
    {
        return ($this->fileSource && $this->fileTarget && is_readable($this->fileSource));
    }

    private function showMsgError()
    {
        $msgError = "\n slc2js.php -s<fileSource.slc> [-d<fileTarget.js>] \n"
            . " Convierte ficheros .slc en ficheros javascript para usar en sokocrafty. \n"
            . "\n\n";

        print($msgError);
    }

    private function getXmlFromSLC()
    {
        try {
            $objSimpleXML = @simplexml_load_file($this->fileSource);

            if ( !($objSimpleXML instanceof SimpleXMLElement) ) {

              print("\nEl fichero " . $this->fileSource . " no es correcto.\n");
              die;
            }

        } catch (Exception $e) {
            print("\nError " . $e->getCode()."\n");
            die;
        }

        return $objSimpleXML;
    }

    private function addLevelToFileJS($xmlLevel, $handleFileJS, $numLevel=1)
    {
        $nameLevel = $xmlLevel->attributes()->Id;
        $widthLevel = $xmlLevel->attributes()->Width;
        $heightLevel = $xmlLevel->attributes()->Height;

        $strMap = "var map = new Array();\n";
        $strMap .= "map['width'] = ".$widthLevel.";\n";
        $strMap .= "map['height'] = ".$heightLevel.";\n";
        $strMap .= "map['name'] = '".$nameLevel."';\n";
        $strMap .= "map['level'] = ".$numLevel.";\n";

        $numBox=0;
        $nLineaMap=0;
        $playerPosW=0;
        $playerPosH=0;

        foreach($xmlLevel->L as $lineLevel) {
            $numBox += $this->getNumBoxesByLineLevel($lineLevel);
            $strMap .= $this->generateLineLevel($lineLevel, $nLineaMap, $widthLevel);

            if ( $this->getPosWPlayerInLine($lineLevel) !== false ) {
                $playerPosW = $this->getPosWPlayerInLine($lineLevel);
                $playerPosH = $nLineaMap;
            }

            $nLineaMap++;
        }

        $strMap .= "map['boxes'] = ".$numBox.";\n";
        $strMap .= "map['time'] = ".(15 * $numBox).";\n";
        $strMap .= "map['player'] = new Array(".$playerPosW."," .$playerPosH.");\n";
        $strMap .= "levels[".$numLevel."] = map;\n\n";

        fwrite($handleFileJS, $strMap);
    }

    private function getPosWPlayerInLine($lineLevel)
    {
        return strpos($lineLevel, self::SLC_CHAR_PLAYER_MAP);
    }

    private function getNormalizedLineLevel($lineLevel, $widthLevel)
    {
        for($n=strlen($lineLevel);$n<$widthLevel;$n++) {
            $lineLevel .="0";
        }
        return $lineLevel;
    }

    private function generateLineLevel($lineLevel, $nLineaMap, $widthLevel)
    {
        $strLineMap = "map[".$nLineaMap."]  = new Array(";

        $lineLevel = $this->getNormalizedLineLevel($lineLevel, $widthLevel);

        $numChars = strlen($lineLevel);
        for($n=0;$n<$numChars;$n++) {
            switch (substr($lineLevel,$n,1)) {
                case self::SLC_CHAR_EMPTY_MAP:
                case self::SLC_CHAR_PLAYER_MAP:
                    $strLineMap .= "0";
                    break;
                case self::SLC_CHAR_WALL_MAP:
                    $strLineMap .= "1";
                    break;
                case self::SLC_CHAR_BOX_MAP:
                case self::SLC_CHAR_BOX_MARK_MAP:
                    $strLineMap .= "3";
                    break;
                case self::SLC_CHAR_MARK_MAP:
                    $strLineMap .= "2";
                    break;
                default:
                    $strLineMap .= "0";
            }
            if ($n<$numChars-1) {
                $strLineMap .= ",";
            }

        }

        $strLineMap .= ");\n";
        return $strLineMap;
    }

    private function getNumBoxesByLineLevel($lineLevel)
    {
        $numBox = substr_count($lineLevel, self::SLC_CHAR_BOX_MAP);
        $numBox += substr_count($lineLevel, self::SLC_CHAR_BOX_MARK_MAP);
        return $numBox;
    }

    private function initFileJS($handleFileTarget)
    {
        $strLevelJs = "\nvar levels = new Array();\n\n";
        fwrite($handleFileTarget, $strLevelJs);

    }

    public function convertFileSLC()
    {
        $this->initParams();

        if ($this->canConvertFiles()) {
            $objSimpleXml = $this->getXmlFromSLC();

            $handleFileTarget = fopen($this->fileTarget, 'w');
            $this->initFileJS($handleFileTarget);

            $numLevel=1;
            foreach ($objSimpleXml->LevelCollection->Level as $xmlLevel) {
                $this->addLevelToFileJS($xmlLevel, $handleFileTarget, $numLevel);
                $numLevel++;
            }

            fclose($handleFileTarget);

        } else {
            $this->showMsgError();
        }
    }

}

$objConvertSlcToJs = new ConvertSLCToJs();
$objConvertSlcToJs->convertFileSLC();

?>