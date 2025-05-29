import './css/Input.css';
import { InputSlot } from './InputSlot';
import { InputField } from './InputField';
import { InputIcon } from './InputIcon';
import { InputLabel } from './InputLabel';
import { InputMessage } from './InputMessage';
import { InputRoot } from './InputRoot';
import { InputSelectBox, InputSelectItem, InputSelectTrigger } from './InputSelectBox';
import { CodeInputGroup } from './CodeInputGroup';

export const Input = {
  Root: InputRoot,
  Field: InputField,
  Codes: CodeInputGroup,
  Icon: InputIcon,
  Label: InputLabel,
  Message: InputMessage,
  Slot: InputSlot,
  SelectTrigger: InputSelectTrigger,
  SelectBox: InputSelectBox,
  SelectItem: InputSelectItem
};