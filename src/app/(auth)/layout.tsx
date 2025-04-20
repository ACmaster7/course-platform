function AuthLayout({ children }: { children: Readonly<React.ReactNode> }) {
  return <div className="min-h-screen flex flex-col justify-center items-center">{children}</div>;
}
export default AuthLayout;
