import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
      .max(50, "Tên đăng nhập không được vượt quá 50 ký tự"),
    fullname: z
      .string()
      .min(2, "Họ tên phải có ít nhất 2 ký tự")
      .max(100, "Họ tên không được vượt quá 100 ký tự"),
    phone: z
      .string()
      .regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(50, "Mật khẩu không được vượt quá 50 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      username: "",
      fullname: "",
      phone: "",
      password: "",
      confirmPassword: "",
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
            Đăng ký
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
                      Tên đăng nhập
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên đăng nhập"
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
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm md:text-base">
                      Họ và tên
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập họ và tên"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm md:text-base">
                      Số điện thoại
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập số điện thoại"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm md:text-base">
                      Xác nhận mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
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
                Đăng ký
              </Button>
            </form>
          </Form>

          <div className="flex items-center justify-start gap-2 pt-4 text-sm md:text-base text-gray-500">
            Đã có tài khoản?
            <Button
              onClick={() => navigate("/auth/sign-in")}
              variant="link"
              className="text-gray-500 hover:text-black p-0 h-auto"
            >
              Đăng nhập
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
