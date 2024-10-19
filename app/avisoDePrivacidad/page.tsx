import { SessionWrapperWithNavBar } from "@/components/auth/SessionWrapper";

export default function AvisoDePrivacidad() {
  return (
    <SessionWrapperWithNavBar>
      <div className="space-y-4 mt-10 mb-8">
        <h1 className="font-bold text-3xl">Aviso de privacidad integral</h1>

        <p>
          Rifas el Magnate mejor conocido como rifas.com, con domicilio en Calle
          #1, Colonia, Ciudad, Entidad, México y portal de internet
          www.rifas.com, es el responsable del uso y protección de sus datos
          personales, y al respecto le informamos lo siguiente:
        </p>

        <p className="font-bold">
          ¿Para qué fines utilizaremos sus datos personales?
        </p>

        <p>
          Los datos personales que recabamos de usted, los utilizaremos para las
          siguientes finalidades que son necesarias para el servicio que
          solicita:
        </p>

        <p>
          Respuesta a mensajes del formulario de contacto, Prestación de
          cualquier servicio solicitado.
        </p>

        <p>Identificación del usuario.</p>

        <p className="font-bold">
          ¿Qué datos personales utilizaremos para estos fines?
        </p>

        <p>
          Para llevar a cabo las finalidades descritas en el presente aviso de
          privacidad, utilizaremos los siguientes datos personales:
        </p>

        <p>Datos de identificación y contacto.</p>

        <p className="font-bold">
          ¿Cómo puede acceder, rectificar o cancelar sus datos personales, u
          oponerse a su uso o ejercer la revocación de consentimiento?
        </p>

        <p>
          Usted tiene derecho a conocer qué datos personales tenemos de usted,
          para qué los utilizamos y las condiciones del uso que les damos
          (Acceso). Asimismo, es su derecho solicitar la corrección de su
          información personal en caso de que esté desactualizada, sea inexacta
          o incompleta (Rectificación); que la eliminemos de nuestros registros
          o bases de datos cuando considere que la misma no está siendo
          utilizada adecuadamente (Cancelación); así como oponerse al uso de sus
          datos personales para fines específicos (Oposición). Estos derechos se
          conocen como derechos ARCO.
        </p>

        <p>
          Para el ejercicio de cualquiera de los derechos ARCO, debe enviar una
          petición vía correo electrónico a email@email.com y deberá contener:
        </p>

        <ul className="list-disc list-inside">
          <li>Nombre completo del titular.</li>
          <li>Domicilio.</li>
          <li>Teléfono.</li>
          <li>Correo electrónico usado en este sitio web.</li>
          <li>Copia de una identificación oficial adjunta.</li>
          <li>Asunto «Derechos ARCO»</li>
        </ul>

        <p>
          Descripción el objeto del escrito, los cuales pueden ser de manera
          enunciativa más no limitativa los siguientes: Revocación del
          consentimiento para tratar sus datos personales; y/o Notificación del
          uso indebido del tratamiento de sus datos personales; y/o Ejercitar
          sus Derechos ARCO, con una descripción clara y precisa de los datos a
          Acceder, Rectificar, Cancelar o bien, Oponerse. En caso de
          Rectificación de datos personales, deberá indicar la modificación
          exacta y anexar la documentación soporte; es importante en caso de
          revocación del consentimiento, que tenga en cuenta que no en todos los
          casos podremos atender su solicitud o concluir el uso de forma
          inmediata, ya que es posible que por alguna obligación legal
          requiramos seguir tratando sus datos personales. Asimismo, usted
          deberá considerar que para ciertos fines, la revocación de su
          consentimiento implicará que no le podamos seguir prestando el
          servicio que nos solicitó, o la conclusión de su relación con
          nosotros.
        </p>

        <p className="font-bold">
          ¿En cuántos días le daremos respuesta a su solicitud?
        </p>

        <p>20 días</p>

        <p className="font-bold">
          ¿Por qué medio le comunicaremos la respuesta a su solicitud?
        </p>

        <p>Al mismo correo electrónico de donde se envío la petición.</p>

        <p className="font-bold">
          El uso de tecnologías de rastreo en nuestro portal de internet
        </p>

        <p>
          Le informamos que en nuestra página de internet utilizamos cookies,
          web beacons u otras tecnologías, a través de las cuales es posible
          monitorear su comportamiento como usuario de internet, así como
          brindarle un mejor servicio y experiencia al navegar en nuestra
          página. Los datos personales que obtenemos de estas tecnologías de
          rastreo son los siguientes:
        </p>

        <p>
          Identificadores, nombre de usuario y contraseñas de sesión, Idioma
          preferido por el usuario, Región en la que se encuentra el usuario.
        </p>

        <p>
          Estas cookies y otras tecnologías pueden ser deshabilitadas. Para
          conocer cómo hacerlo, consulte el menú de ayuda de su navegador. Tenga
          en cuenta que, en caso de desactivar las cookies, es posible que no
          pueda acceder a ciertas funciones personalizadas en nuestros sitio
          web.
        </p>

        <p className="font-bold">
          ¿Cómo puede conocer los cambios en este aviso de privacidad?
        </p>

        <p>
          El presente aviso de privacidad puede sufrir modificaciones, cambios o
          actualizaciones derivadas de nuevos requerimientos legales; de
          nuestras propias necesidades por los productos o servicios que
          ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro
          modelo de negocio, o por otras causas. Nos comprometemos a mantener
          actualizado este aviso de privacidad sobre los cambios que pueda
          sufrir y siempre podrá consultar las actualizaciones que existan en el
          sitio web www.rifas.com.
        </p>

        <small>
          Última actualización de este aviso de privacidad: 13/08/2024
        </small>
      </div>
    </SessionWrapperWithNavBar>
  );
}
