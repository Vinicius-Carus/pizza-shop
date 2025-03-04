import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const singInFormSchema = z.object({ email: z.string().email() });

type SignInFormSchemaType = z.infer<typeof singInFormSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormSchemaType>({
    resolver: zodResolver(singInFormSchema),
  });

  function handleSingIn(data: SignInFormSchemaType) {
    console.log(data);
  }

  return (
    <>
      <Helmet title="SignIn" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <span className="text-muted-foreground text-sm">
              Acompanhe suas vendas
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleSingIn)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
