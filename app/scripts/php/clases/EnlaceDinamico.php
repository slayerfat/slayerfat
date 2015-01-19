<?php 

/**
 * @author Alejandro Granadillo. slayerfat@gmail.com
 *
 * @version 1.0
 */
class EnlaceDinamico{

  /**
   * genera las variables de la clase, archivo y enlace.
   * @param string $archivo el archivo a buscar.
   */
  public function __construct($archivo='index.php'){

    $this->archivo = $archivo;

    $this->enlace = self::buscar($this->archivo);

  }
  /**
   * archivo
   * @return string regresa el archivo que se desea buscar.
   */
  public function archivo(){
    return $this->archivo;
  }
  /**
   * enlace
   * @return string regresa el enlace del archivo en el sistema.
   */
  public function enlace(){
    return $this->enlace;
  }
  /**
   * buscar
   * @param  string $archivo el archivo a buscar.
   * @return string          la direccion en el sistema del archivo.
   */
  static function buscar($archivo='index.php'){
    // PHP_SELF regresa el camino absoluto al archivo.
    // dividimos self en un array:
    $explotaDir = explode('/', $_SERVER['PHP_SELF']);
    // vemos la dimension del array:
    $dimension = count($explotaDir);
    //self (donde sea que este index.php)
    // es el ultimo lugar del array:
    $valor = $explotaDir[$dimension-1];
    // como queremos ir a index.php entonces:
    // $index = "index.php";
    //se cambia el camino relativo:
    $puntoPunto = "../";
    for ($i=4; $i < $dimension; $i++) :
      $archivo = $puntoPunto.$archivo;
    endfor;
    return $archivo;
  }
}

?>
