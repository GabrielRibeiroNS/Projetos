<?php

    require "./bibliotecas/PHPMailer/Exception.php";
    require "./bibliotecas/PHPMailer/OAuth.php";
    require "./bibliotecas/PHPMailer/PHPMailer.php";
    require "./bibliotecas/PHPMailer/POP3.php";
    require "./bibliotecas/PHPMailer/SMTP.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    Class Mensagem {
        private $para = null;
        private $assunto = null;
        private $mensagem = null;

        public function __get($atributo) {
            return $this->$atributo;
        }

        public function __set($atributo, $valor) {
            $this->$atributo = $valor;
        }

        public function MensagemValida(){
            if(empty($this->para) || empty($this->assunto) || empty($this->mensagem)){
                return False;
            } else {
                return True;
            }
        }
    }

        $mensagem_inst = new Mensagem();
        $mensagem_inst->__set('para', $_POST['para']);
        $mensagem_inst->__set('assunto', $_POST['assunto']);
        $mensagem_inst->__set('mensagem', $_POST['mensagem']);
        
        //print_r($mensagem_inst);

        if(!$mensagem_inst->MensagemValida()) { //=False
            echo 'Mensagem Não é Válida';
            die();
        }

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com.';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'testedev007@gmail.com';                     //SMTP username
            $mail->Password   = 'chtacdqkifcrdbug';                               //SMTP password
            $mail->SMTPSecure = 'tls';                //PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('testedev007@gmail.com', 'TESTE REMETENTE');
            $mail->addAddress('testedev007@gmail.com', 'TESTE DESTINARIO');     //Add a recipient
            //$mail->addAddress('ellen@example.com');               //Name is optional
            //$mail->addReplyTo('info@example.com', 'Information'); 
            //$mail->addCC('cc@example.com'); //Em copy
            //$mail->addBCC('bcc@example.com'); //Em copy

            //Attachments ANEXOS
            //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Oi eu sou o assunto'; //Assunto
            $mail->Body    = 'Essa é uma mensagem de corpo HTML <b>em negrito!</b>'; //Paragrafo
            $mail->AltBody = 'Essa é uma mensagem de corpo HTML em negrito!'; //Não tera suporte aa elemntos HTML

            $mail->send();
            echo 'Mensagem foi enviada';
        } catch (Exception $e) {
            echo "Mensagem não pode ser enviada. Erro de E-mail: {$mail->ErrorInfo}";
        }
