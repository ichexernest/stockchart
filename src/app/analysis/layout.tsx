import { Container } from "@mui/material"
import Autocomplete from "@/components/Autocomplete";

export default function AnalysisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <nav className="top-nav w-full flex items-center justify-center p-4 bg-gray-100 color-black">
                <Autocomplete />
            </nav>

            <Container maxWidth="lg"
                className="flex-1 flex flex-col p-0" >
                <div className=" flex-1 min-h-full">
                    {children}
                </div>
            </Container>


        </div>
    );
}