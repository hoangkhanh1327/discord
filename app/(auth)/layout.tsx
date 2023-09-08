interface IAuthLayout {
    children: React.ReactNode;
}
const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
    return (
        <div className='h-full flex items-center justify-center'>
            {children}
        </div>
    );
};

export default AuthLayout;
