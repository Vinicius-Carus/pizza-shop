import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router";
import { InputHookForm } from "@/components/ui/input-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

const signInFormSchema = z.object({ email: z.string().email() });

type SignInFormSchemaType = z.infer<typeof signInFormSchema>;

export default function SignIn() {
  const [searchParams] = useSearchParams();

  const signInForm = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: searchParams.get("email") ?? "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = signInForm;

  const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn });

  async function handleSignIn(data: SignInFormSchemaType) {
    try {
      await authenticate({ email: data.email });
      toast.success("Enviamos um link de autenticação para seu e-mail", {
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(data),
        },
      });
    } catch (error) {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <>
      <Helmet title="SignIn" />
      <div className="p-8">
        <Button asChild variant={"ghost"} className="absolute top-8 right-8">
          <Link to={"/sign-up"}>Novo estabelecimetno</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <span className="text-muted-foreground text-sm">
              Acompanhe suas vendas pelo painel do parceiro
            </span>
          </div>
          <FormProvider {...signInForm}>
            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="flex flex-col gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <InputHookForm id="email" type="email" name="email" />
              </div>
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Acessar painel
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
