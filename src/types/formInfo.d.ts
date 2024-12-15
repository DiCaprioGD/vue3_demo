/*组织架构选择框数据格式*/

export interface OrganizationFormData {
    // leavelPath
    codePath: string | undefined;
    //名称
    name: string | number | undefined;
    //id
    id: any;
}

export interface FormRules<T = any> {
    [key: string]: Array<FormItemRule<T>>;
}

interface FormItemRule<T = any> {
    required?: boolean;
    message?: string;
    trigger?: 'blur' | 'change' | Array<'blur' | 'change'>;
    validator?: (rule: FormItemRule<T>, value: T, callback: (error?: string) => void) => void;
}


/*form表单item配置项数据*/
export type FormItem = {
    [TypeName in typeof FormItemType] :{type: TypeName}
    &
    {
        [FormItemType.input] : FormItemInput,
        [FormItemType.ipInput] : FormItemInput,
        [FormItemType.organization] : FormItemOrganization,
        [FormItemType.numberInput] : FormItemInput,
        [FormItemType.select] : FormItemSelect,
        [FormItemType.file] : FormItemFile,
        [FormItemType.filtrate] : FormItemFiltrate,
    }[Type]
}[FormItemType]


interface FormItemType{
    // 'input' | 'organization' | 'numberInput' | 'select' | 'file' | 'filtrate',
    input: string,
    ipInput: string,
    organization: string,
    numberInput: string,
    select: string,
    file: string,
    filtrate: string,
}

// /*form表单item配置项数据*/
// export interface FormItem {
//     //字段名称描述
//     label:string,
//     //输入框 ，组织架构选择框，数字框，下拉框
//     itemType:'input' | 'organization' | 'numberInput' | 'select' | 'file' | 'filtrate',
//     // 组织架构选择框返回的取值字段名称，默认codePath
//     organizationField?:'id' | 'codePath',
//     //form表单的key值
//     key: string
//     //是否必填必选，默认false，配置必填会自动生成必填的rule
//     required?: boolean,
//     //默认值
//     value?:string | number | boolean | null | undefined
//     //下拉框选项值
//     options?: Array<any>
//     //下拉框选项值获取数据的方法
//     getOptions?: () => void
//     //输入框类型：文本，密码
//     type?: 'text' | 'password';
//     // 是否禁用，默认false
//     disabled?:boolean
//     //内容元素（如输入框）宽度，默认180px
//     contentWidth?: string;
//     rule?: Array<FormItemRule>
//     autocomplete?: string;
//     //允许选择文件数量
//     fileLimit?:number | 1;
//     // 是否支持多选文件
//     fileMultiple?:boolean | false;
//     filterItemList?:Array<FilterItemType>;
// }



interface FormItemInfo {
    //字段名称描述
    label:string,
    //输入框 ，组织架构选择框，数字框，下拉框
    //form表单的key值
    key: string
    //是否必填必选，默认false，配置必填会自动生成必填的rule
    required?: boolean,
    // 是否禁用，默认false
    disabled?:boolean,
    // 控制显示隐藏：默认显示，true隐藏
    isHidden?:boolean,
    rule?: Array<FormItemRule>
}

interface FormItemInput extends FormItemInfo {
    itemType:'input' ,
    //默认值
    value?:string | number | boolean | null | undefined
    //输入框类型：文本，密码
    type?: 'text' | 'password';
    //内容元素（如输入框）宽度，默认180px
    contentWidth?: string;
    autocomplete?: string;
}
// interface FormItemIpInput extends FormItemInfo {
//     itemType:'ipInput' ,
//     //默认值
//     value?:string | number | boolean | null | undefined
//     //输入框类型：文本，密码
//     type?: 'text';
//     //内容元素（如输入框）宽度，默认180px
//     contentWidth?: string;
//     autocomplete?: string;
// }
interface FormItemSelect extends FormItemInfo {
    //默认值
    itemType:'select',
    value?:string | number | boolean | null | undefined
    //下拉框选项值
    options?: Array<any>
    //下拉框选项值获取数据的方法
    getOptions?: () => void
    //内容元素（如输入框）宽度，默认180px
    contentWidth?: string;
}

interface FormItemOrganization extends FormItemInfo {
    itemType: 'organization',
    // 组织架构选择框返回的取值字段名称，默认codePath
    organizationField?:'id' | 'codePath',
    //默认值
    value?:string | number | boolean | null | undefined
}

interface FormItemFiltrate extends FormItemInfo {
    itemType: 'filtrate',
    value?:Array<any> | null | undefined
    filterItem?:FilterItemType;
}

interface FormItemFile extends FormItemInfo {
    itemType:'file',
    //允许选择文件数量
    fileLimit?:number | 1;
    // 是否支持多选文件
    fileMultiple?:boolean | false;
    //允许上传文件类型
    fileAccept?:String
}
// 复杂条件筛选组合
export interface FilterItemType{
    filedKey: string,
    filedOptions:Array<any>,
    getFiledOptions?: ()=> any[],
    expressionKey: string,
    expressionOptions:Array<any>,
    getExpressionOptions?: ()=> any[],
    valueKey: string,
    getValueOptions?: ()=> void,
    children?: FilterItemType | Array<FilterItemType>,
}
/*表单配置项*/
