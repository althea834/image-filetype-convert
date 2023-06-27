import { forwardRef } from "react";

interface LinkButtonProps
    extends React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    > {
    text: React.ReactNode;
}

const LinkButton = forwardRef(function Link(
    props: LinkButtonProps,
    ref: React.ForwardedRef<HTMLAnchorElement>
) {
    return (
        <a ref={ref} {...props}>
            <button className={props.className}>{props.text}</button>
        </a>
    );
});

export default LinkButton;
