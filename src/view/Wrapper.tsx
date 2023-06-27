const Wrapper = ({
    children,
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>) => {
    return (
        <div className="min-h-screen mx-auto my-10 px-10 pt-5 pb-16 w-[680px] bg-white rounded-lg shadow-md">
            {children}
        </div>
    );
};

export default Wrapper;
