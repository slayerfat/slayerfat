<?php 

/**
 * 
 */

class Conexion extends mysqli{

  /**
   * genera las variables del servidor por medio de conexion.ini
   */
  public function __construct(){
    $ini = EnlaceDinamico::buscar($_SERVER['DOCUMENT_ROOT']
      . '/php.slayerfat.com.ve/app/scripts/php/clases/conexion.ini');
    $parse    = parse_ini_file($ini , true);
    $servidor = $parse['servidor'];
    $usuario  = $parse['usuario'];
    $clave    = $parse['clave'];
    $db       = $parse['db'];

    parent::__construct($servidor, $usuario, $clave, $db);

  }

  /**
   * regresa verdadero o falso segun el estado de la conexion o query.
   * @return boolean
   */
  public function error(){
    return self::chequeaError();
  }

  /**
   * chequea si hay error en la conexion y regresa verdadero o falso
   * @return boolean 
   */
  private function chequeaError(){
    if (mysqli_connect_error()) :
      return false;
    else:
      return true;
    endif;
  }

  public function generarError($tipo = null){
    switch ($tipo) :
      case 'criptico':
        $fecha  = date('d/m/y');
        $error1 = substr($this->errno, 0, 2);
        $error2 = substr($this->errno, 2, 4);
        $self   = $_SERVER['PHP_SELF'];
        return "Error inesperado en el sistema: (" . 
          $fecha.$error1."-".$self."-".$error2 . ") ";
        break;
      
      case 'full':
        return "Error: (" . $this->errno . ") " . $this->error;
        break;
      
      default:
        return "Error: (" . $this->errno . ") " . $this->error;
        break;
    endswitch;
  }
}
