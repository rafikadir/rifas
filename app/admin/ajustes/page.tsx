import BackButtonWrapper from "@/components/ui/BackButtonWraper";
import { Title } from "@/components/ui/Title";
import { checkUserAdminRole } from "@/src/utils/checkUserAdmin";

export default async function perfilAdminPage() {
  await checkUserAdminRole();

  return (
    <BackButtonWrapper>
      <Title>Ajustes</Title>
      <p>Nombre de la página: <b>Rifas el Magnate</b></p>
      <p>Descripción principal: <b>Sorteos entre amigos</b></p>
      <p>Color principal: <input type="color" name="" id="" className="h-5 w-10" /></p>
      <p>Color secundario: <input type="color" name="" id="" className="h-5 w-10" /></p>
    </BackButtonWrapper>
  );
}
