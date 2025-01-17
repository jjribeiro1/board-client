"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginInput, loginSchema } from "../schemas/login-schema";
import { useLoginMutation } from "../mutations/use-login-mutation";

export function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate } = useLoginMutation();

  function onSubmit(data: LoginInput) {
    const mutationData = {
      email: data.email,
      password: data.password,
    };

    mutate(mutationData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center">Faça seu login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-y-6">
            <Button className="w-full" type="submit">
              Entrar
            </Button>

            <div className="flex items-center gap-1 text-center">
              <span>Não tem uma conta?</span>
              <Link href={"/register"} className="text-secondary-foreground font-medium hover:underline">
                Registre-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
