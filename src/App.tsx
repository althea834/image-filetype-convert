import { useRef, useState } from "react";

import "./App.css";
import Header from "./view/Header";
import LinkButton from "./component/LinkButton";
import Wrapper from "./view/Wrapper";
import UploadButton from "./component/UploadButton";

type FileType = "png" | "jpg";

const width = 600;

function App() {
    const [file, setFile] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const buttonPngRef = useRef<HTMLAnchorElement>(null);
    const buttonJpgRef = useRef<HTMLAnchorElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !canvasRef.current) {
            return;
        }

        console.log(e.target.files[0]);

        const context = canvasRef.current.getContext(
            "2d"
        ) as CanvasRenderingContext2D;
        const transformFile = URL.createObjectURL(e.target.files[0]);
        const img = new Image();
        img.src = transformFile;
        img.onload = () => {
            if (!canvasRef.current) {
                return;
            }
            canvasRef.current.width = width;
            canvasRef.current.height = (width * img.height) / img.width;
            context.drawImage(
                img,
                0,
                0,
                width,
                (width * img.height) / img.width
            );
            setFile(true);
        };
    };

    const convertImageFiletype = (
        ref: React.RefObject<HTMLAnchorElement>,
        filetype: FileType
    ) => {
        if (!canvasRef.current || !ref.current) {
            return;
        }
        ref.current.href = canvasRef.current.toDataURL(`image/${filetype}`);
    };

    const className = file ? "" : "hidden";

    return (
        <Wrapper>
            <Header />
            <section>
                <section className="pt-9 text-center">
                    <UploadButton
                        className="inline-block px-4 py-2 font-medium border border-solid border-cyan-700 rounded-lg hover:bg-cyan-700 hover:text-slate-50"
                        text={"上傳圖片"}
                        onUploadChange={handleUpload}
                        accept="image/webp"
                    ></UploadButton>
                    <section className="mx-auto py-4 ">
                        <canvas ref={canvasRef} id="canvas"></canvas>
                    </section>
                </section>
                <ul className={`flex justify-around mt-5 ${className}`}>
                    <li>
                        <LinkButton
                            className="text-black border-cyan-700 hover:bg-cyan-700 hover:text-slate-50 hover:border-cyan-700"
                            ref={buttonJpgRef}
                            download={"convertToJPG.jpg"}
                            onClick={() => {
                                convertImageFiletype(buttonJpgRef, "jpg");
                            }}
                            text={"webp 轉 jpg"}
                        ></LinkButton>
                    </li>
                    <li>
                        <LinkButton
                            className="text-black border-cyan-700 hover:bg-cyan-700 hover:text-slate-50 hover:border-cyan-700"
                            ref={buttonPngRef}
                            download={"convertToPNG.png"}
                            onClick={() => {
                                convertImageFiletype(buttonPngRef, "png");
                            }}
                            text={"webp 轉 png"}
                        ></LinkButton>
                    </li>
                </ul>
            </section>
        </Wrapper>
    );
}

export default App;
