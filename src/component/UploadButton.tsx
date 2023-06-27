interface UploadButtonProps
    extends React.DetailedHTMLProps<
        React.LabelHTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
    > {
    text: string;
    onUploadChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    accept?: string | undefined;
}

const UploadButton = ({
    onUploadChange,
    text,
    ...props
}: UploadButtonProps) => {
    return (
        <label {...props}>
            <input
                type="file"
                className="hidden"
                accept={props?.accept}
                onChange={onUploadChange}
            ></input>
            {text}
        </label>
    );
};

export default UploadButton;
