import { TextboxQuestion } from './question-textbox';
import { QuestionProperties } from './questionproperties';

export class TextAreaBox extends TextboxQuestion{
    constructor(options: QuestionProperties<string> | { key: string, label: string, type: 'string' }){
        super(options)
        this.controlType = "textArea"
    }
}