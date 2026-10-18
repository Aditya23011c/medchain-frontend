/**
 * Contract types. Mirror backend/openapi.yaml; update here when the spec changes.
 * @typedef {'doctor'|'diagnostic_center'|'pharmacy'} Role
 * @typedef {{provider_id:string,name:string,type:Role,verified:boolean}} Provider
 * @typedef {{token:string,provider:Provider}} Session
 * @typedef {{patient_id:string,name:string,dob:string,sex:'M'|'F'|'O',aadhaar_masked:string}} Patient
 * @typedef {{result_id:string,report_id:string,test_name:string,value:number,unit:string,ref_low:number,ref_high:number,flag:'high'|'low',ocr_confidence:number,reported_on:string,provider_name:string}} FlaggedResult
 * @typedef {{patient_id:string,flagged:FlaggedResult[],needs_review_count:number}} Summary
 * @typedef {'uploading'|'anchoring'|'ocr_running'|'done'|'needs_manual_review'|'error'} UploadStage
 * @typedef {{report_id:string,stage:UploadStage,message?:string}} UploadStatusDto
 */
export {};
