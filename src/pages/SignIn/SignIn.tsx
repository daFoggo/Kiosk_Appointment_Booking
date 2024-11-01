import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2, "Username or email is required"),
  password: z.string().min(3, "Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4 font-inter bg-gray-50 rounded-lg">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle className="font-bold text-xl md:text-2xl text-indigo-400">
            Đăng nhập
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm md:text-base">
                      Tên người dùng
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên người dùng"
                        className="h-10 md:h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm md:text-base">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="h-10 md:h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <p className="text-red-500 text-xs md:text-sm">
                  {form.formState.errors.root.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-10 md:h-12 font-semibold text-sm md:text-base bg-indigo-400 hover:bg-indigo-500 transition-colors"
              >
                Đăng nhập
              </Button>
            </form>
          </Form>

          <div className="flex items-center justify-start gap-2 pt-4 text-sm md:text-base text-gray-500">
            Chưa có tài khoản?
            <Button
              onClick={() => navigate("/auth/sign-up")}
              variant="link"
              className="text-gray-500 hover:text-black p-0 h-auto"
            >
              Đăng ký
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
