import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { InputHookForm } from "@/components/ui/input-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";
const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const navigate = useNavigate();

  const signUpForm = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = signUpForm;

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  function handleSignUp(data: SignUpFormSchemaType) {
    try {
      registerRestaurantFn({
        restaurantName: data.restaurantName,
        email: data.email,
        managerName: data.managerName,
        phone: data.phone,
      });

      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild variant={"ghost"} className="absolute top-8 right-8">
          <Link to={"sign-in"}>Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <span className="text-muted-foreground text-sm">
              Seja um parceiro e comece suas vendas!
            </span>
          </div>
          <FormProvider {...signUpForm}>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex flex-col gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="restaurant">Nome do estabelecimento</Label>
                <InputHookForm
                  id="restaurant"
                  type="text"
                  name="restaurantName"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="managerName">Seu nome</Label>
                <InputHookForm
                  id="managerName"
                  type="text"
                  name="managerName"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <InputHookForm id="email" type="email" name="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Seu celular</Label>
                <InputHookForm id="phone" type="text" name="phone" />
              </div>

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Finalizar cadastro
              </Button>

              <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
                Ao continuar, você concorda com nossos{" "}
                <a className="unde underline-offset-4" href="">
                  Termos de serviço
                </a>{" "}
                e{" "}
                <a className="unde underline-offset-4" href="">
                  politicas de privacidade
                </a>
                .
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
