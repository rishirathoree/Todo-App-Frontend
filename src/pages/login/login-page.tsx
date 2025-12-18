import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { login } from "@/stores/slices/auth";
import { setIdleTime } from "@/stores/slices/timings";
import { useAppDispatch, type RootState } from "@/stores/stores";
import { GitBranch, Github } from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, } from "react-router";

export default function Login04() {

  const { pending, data, error } = useSelector((state: RootState) => state.auth.auth)
  console.log(pending, data, error, 'pending, data, error')

  const [create, setCreate] = useState({
    email: "",
    password: ""
  })

  const dispatch = useAppDispatch()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value
    })
  }

  const isValid = useMemo(() => {
    return create.email && create.password
  }, [create])

  const handleSubmit = async () => {
    dispatch(login(create))
    dispatch(setIdleTime(Date.now()))
  }

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h3 className="mt-6 text-lg font-semibold text-foreground dark:text-foreground">
            Sign in to your account
          </h3>
          <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
            >
              Sign up
            </Link>
          </p>
          <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              aria-disabled
              disabled
              variant="outline"
              className="flex-1 items-center justify-center space-x-2 py-2"
              asChild
            >
              <a href="#">
                <Github className="size-5" aria-hidden={true} />
                <span className="text-sm font-medium">Login with GitHub</span>
              </a>
            </Button>
            <Button
              aria-disabled
              disabled
              variant="outline"
              className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0"
              asChild
            >
              <a href="#">
                <GitBranch className="size-4" aria-hidden={true} />
                <span className="text-sm font-medium">Login with Google</span>
              </a>
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                onChange={handleChange}
                value={create.email}
                name="email"
                autoComplete="email"
                placeholder="daniel@gmail.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Password
              </Label>
              <Input
                type="password"
                onChange={handleChange}
                value={create.password}
                id="password"
                name="password"
                autoComplete="password"
                placeholder="********"
                className="mt-2"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              className="mt-4 w-full py-2 font-medium">
              {pending && <Spinner />}
              Sign in
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground">
            Forgot your password?{" "}
            <a
              href="#"
              className="font-medium text-primary cursor-not-allowed hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
            >
              Reset password
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}