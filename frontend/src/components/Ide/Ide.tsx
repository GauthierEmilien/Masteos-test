import { TextField } from '@material-ui/core';
import './Ide.scss';

interface IdeProps {
  code: string;
  onChange: (e: any) => void;
}

export default function Ide({ code, onChange }: IdeProps) {
  // const [caretPos, setCaretPos] = useState(0);
  // const textfield = useRef<any>();

  // useEffect(
  //   () => textfield.current.setSelectionRange(caretPos, caretPos),
  //   [caretPos]
  // );

  // const autoBrackets = (e: React.KeyboardEvent) => {
  //   console.log("e", e);
  //   const position = (e.target as any).selectionStart;
  //   if (e.key === "{" || e.key === "(" || e.key === "[") {
  //     const newCode = [
  //       code.slice(0, position),
  //       e.key,
  //       String.fromCharCode(e.key.charCodeAt(0) + (e.key === "(" ? 1 : 2)),
  //       code.slice(position),
  //     ].join("");
  //     setCode(newCode);
  //     e.preventDefault();
  //   }
  //   setCaretPos(position);
  // };

  return (
    <div className="ide">
      <TextField
        // inputRef={textfield}
        spellCheck={false}
        multiline
        rows={25}
        variant="outlined"
        fullWidth
        value={code}
        onChange={onChange}
        // onKeyPress={autoBrackets}
      />
    </div>
  );
}
