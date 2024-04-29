import useTheme from "./useStyle";
import { Svg, Path } from "react-native-svg";

const Indicator = (props: any) => {
    const colorscheme = useTheme()
    return (
        <Svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 0H12.5H24C23.2426 0.192697 21.5 1.00081 21 3.00243C20.0337 6.87085 16.7329 11.1605 12 10.9954C7.2671 11.1605 3.96632 6.87085 3 3.00243C2.5 1.00081 0.757365 0.192697 0 0H11.5Z"
                // fill={colorscheme.background}
                fill="#f2f2f2"
            />
        </Svg>
    )
};

export default Indicator;