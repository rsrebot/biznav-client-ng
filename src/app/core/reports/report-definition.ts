export class DRColumn {
    // COLUMNNAME
    public columnName: string = null;
    // COLUMNTYPE
    public columnType: string = null;
    // FORMAT
    public format: string = null;
    // CONDITION
    public condition: string = null;
    // VISIBLE
    public visible = false;
    // POSITION
    public position = 0;
}

export class DROutputOption {
    // ID
    public id: string = null;
    // SELECTED
    public selected = false;
}

export class DROutputFormat {
    // ENCODINGS
    public encodings: DROutputOption[] = [];
    // DATEFORMATS
    public dateFormats: DROutputOption[] = [];
    // DECIMALSEPARATORS
    public decimalSeparators: DROutputOption[] = [];
}

export class DROutputProtocol {
    // NEEDSPASSWORD
    public needsPassword = false;
    // NEEDSCERTIFICATE
    public needsCertificate = false;
    // VALUE
    public value: string = null;
    // USERNAME
    public username: string = null;
    // PASSWORD
    public password: string = null;
}

export class DROutputOptions {
    // FORMATS
    public formats: DROutputFormat[] = [];
    // CONTAINERS
    public containers: DROutputContainer[] = [];
    // PROTOCOLS
    public protocols: DROutputProtocol[] = [];
}

export class DROutputContainer {
    // NEEDSPASSWORD
    public needsPassword = false;
    // PASSWORD
    public password: string = null;
}

export class DRParameterValue {
    // PARAMNAME
    public paramName: string = null;
    // VALUE
    public value: string = null;
    // SELECTEDVALUES
    public selectedValues: string[] = [];
}

export class DRParameter {
    // ISOPTIONAL
    public isOptional = false;
    // ISREADONLY
    public isReadOnly = false;
    // PARAMTYPE
    public paramType: string = null;
    // ISDYNLOOKUP
    public isDynLookup = false;
    // DEFAULTLOOKUP
    public defaultLookup: string = null;
}

export enum DRQueryMode {
    qryFile, // creates a file
    qryLive, // data stream
    qryScheduler, // create a schedule
    qryDataSource // request from data source API
}

export class DRQueryBase {
    // PARAMETERS
    public parameters: DRParameter[] = [];
    // COLUMNS
    public columns: DRColumn[] = [];
}

export class DRQuery extends DRQueryBase {
  // QUERYMODE
  public queryMode: DRQueryMode = null;
  // HEADLINESUPPRESSED
  public headlineSuppressed = false;
  // SOURCEID
  public sourceID: string = null;
  // // TARGETSTREAM
  // public targetStream: Stream = null;
  // ENFORCEDSCHEDULING
  public enforcedScheduling = false;
  // JOBID
  public jobID = 0;
  // ERRORKEY
  public errorKey: string = null;
  // ERROREMAILRECIPIENTS
  public errorEmailRecipients: string = null;
  // HELPTEXT
  public helpText: string = null;
  // OUTPUTOPTIONS
  public outputOptions: DROutputOptions = null;
  // DENYSCHEDULING
  public denyScheduling = false;
  // ALLOWDISPLAYTOBROWSER
  public allowDisplayToBrowser = false;
  // SYNCHRONOUSEXEC
  public synchronousExec = false;
  // DATERANGELIMIT
  public dateRangeLimit = 0;
  // ENFORCEENCRYPTION
  public enforceEncryption = false;
  // TIMEPLAN
  public timePlan: string = null;
  // SERVICEVERSION
  public serviceVersion: string = null;
  // RESULTFORMAT
  public resultFormat: string = null;
}

export class QueryDefViewModel {
  // OBJID
  public objId: string = null;
  // MISQUERY
  public misQuery: TMisQuery = null;
  // NAME
  public name: string = null;
  // CAPTION
  public caption: string = null;
  // DESCRIPTION
  public description: string = null;
  // CONNECTION
  public connection: string = null;
  // SQL
  public sql: string = null;
  // COLUMNS
  public columns: TMisColumn[] = [];
  // PARAMS
  public params: TMisParam[] = [];
  // COMMENT
  public comment: string = null;
  // HELP
  public help: string = null;
}

export class TMisColumn {
    // POSITION
    public position = 0;
    // NAME
    public name: string = null;
    // CAPTION
    public caption: string = null;
    // CMSELEMENT
    public cmsElement: string = null;
    // XMLNAME
    public xmlName: string = null;
    // STEREOTYPE
    public stereotype: string = null;
    // TRENDTYPE
    public trendtype: string = null;
    // DATATYPE
    public dataType: string = null;
    // FORMAT
    public format: string = null;
    // VISIBLE
    public visible = false;
}

export class TMisParam {
    // SKIP
    public skip = false;
    // SQLNAME
    public sqlName: string = null;
    // NAME
    public name: string = null;
    // CAPTION
    public caption: string = null;
    // CMSELEMENT
    public cmsElement: string = null;
    // PARAMTYPE
    public paramType: TMisParamType = null;
    // ISOPTIONAL
    public isOptional = false;
    // ISREADONLY
    public isReadOnly = false;
    // ISSYSTEM
    public isSystem = false;
    // LOOKUP
    public lookup: TMisLookup = null;
    // LOOKUPSOURCE
    public lookupSource: string = null;
    // DEFAULT
    public default: string = null;
    // VALUE
    public value: any = null;
    // POSITION
    public position = 0;

    public static lookupMode(param: TMisParam): ParamLookupMode {
        if (param.isSystem) {
            return ParamLookupMode.system;
        }

        if (!param.lookup) {
            return ParamLookupMode.none;
        } else {
            if (param.lookup.sql && param.lookup.sql.length > 0) {
                return ParamLookupMode.sql;
            } else {
                return ParamLookupMode.lookupValues;
            }
        }
    }
}

export enum ParamLookupMode {
  none,
  lookupValues,
  sql,
  system
}

export class TMisLookup {
    // SQL
    public sql: any[] = [];
    // PARAMS
    public params: any[] = [];
    // ITEMS
    public items: any[] = [];
}

export enum TMisParamType {
    mptUnknown,
    mptString,
    mptNumber,
    mptDate,
    mptDateStrDMY,
    mptDateStrMDY,
    mptSubstDBO,
    mptGroup,
    mptSet,
    mptStringSet,
    mptDateRangeRNG,
    mptSystem,
    mptFloat
}

export class TMisQuery {
  // PRECONDITIONACTIVE
  public preconditionActive = false;
  // MISFILEID
  public misFileID = 0;
  // FILEVERSION
  public fileVersion = 0;
  // STATUSID
  public statusID: string = null;
  // CMSELEMENT
  public cmsElement: string = null;
  // SOXRELEVANT
  public soxRelevant = false;
  // NAME
  public name: string = null;
  // JOBID
  public jobID = 0;
  // ERRORKEY
  public errorKey: string = null;
  // CAPTION
  public caption: string = null;
  // CONNECTION
  public connection: string = null;
  // DESCRIPTION
  public description: string = null;
  // HELP
  public help: string = null;
  // COMMENT
  public comment: string = null;
  // SERVICEVERSION
  public serviceVersion: string = null;
  // SQL
  public sql: any[] = [];
  // COLUMNS
  public columns: TMisColumn[] = [];
  // PARAMS
  public params: TMisParam[] = [];
  // PRECONDITIONSQL
  public preconditionSQL: any[] = [];
  // DENYSCHEDULING
  public denyScheduling = false;
  // ENFORCEENCRYPTION
  public enforceEncryption = false;
  // ALLOWDISPLAYTOBROWSER
  public allowDisplayToBrowser = false;
  // SYNCHRONOUSEXEC
  public synchronousExec = false;
  // ORIGIN
  public origin: string = null;
  // DATERANGELIMIT
  public dateRangeLimit = 0;
  // CMSID_HELPTEXT
  public cmsiD_Helptext: string = null;
  // CMSID_SHORTDESCRIPTION
  public cmsiD_ShortDescription: string = null;
  // USERNAME
  public username: string = null;
}

export class QueryValidator {
    public oldColumnNames: string[];

    public oldParamNames: string[];

    public colsModified: boolean;

    public paramsModified: boolean;

    public errorMessage: string;

    public updatedDefinition: QueryDefViewModel;
}
