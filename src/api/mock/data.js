export const patient = {
  patient_id: 'p_101', name: 'Ravi Sharma', dob: '1988-04-12', sex: 'M', aadhaar_masked: 'XXXX XXXX 4821',
};

export const summary = {
  patient_id: 'p_101',
  needs_review_count: 1,
  flagged: [
    { result_id: 'x1', report_id: 'r_55', test_name: 'Haemoglobin', value: 18.9, unit: 'g/dL', ref_low: 13.0, ref_high: 17.0, flag: 'high', ocr_confidence: 0.97, reported_on: '2024-03-02', provider_name: 'City Diagnostics' },
    { result_id: 'x2', report_id: 'r_41', test_name: 'LDL cholesterol', value: 168, unit: 'mg/dL', ref_low: 0, ref_high: 100, flag: 'high', ocr_confidence: 0.93, reported_on: '2023-06-18', provider_name: 'Apex Pathology' },
    { result_id: 'x3', report_id: 'r_31', test_name: 'TSH', value: 0.2, unit: 'mIU/L', ref_low: 0.4, ref_high: 4.0, flag: 'low', ocr_confidence: 0.95, reported_on: '2022-11-09', provider_name: 'City Diagnostics' },
  ],
};

export const timeline = [
  { type: 'dispense', id: 'd_3', date: '2024-03-09', pharmacy_name: 'LifeCare Pharmacy', prescription_id: 'rx_9', items: [{ name: 'Iron-folic acid', qty: 30 }] },
  { type: 'prescription', id: 'rx_9', date: '2024-03-08', provider_name: 'Dr. Meera Iyer', medicines: [{ name: 'Iron-folic acid', dosage: '1 tablet daily' }], notes: 'Recheck haemoglobin in 8 weeks.' },
  { type: 'report', id: 'r_55', date: '2024-03-02', provider_name: 'City Diagnostics', report_type: 'Complete blood count', ocr_status: 'done', file_url: '#', results_count: 18, abnormal_count: 1 },
  { type: 'report', id: 'r_70', date: '2023-09-21', provider_name: 'Apex Pathology', report_type: 'Liver function test', ocr_status: 'needs_manual_review', file_url: '#', results_count: 11, abnormal_count: 0 },
  { type: 'report', id: 'r_41', date: '2023-06-18', provider_name: 'Apex Pathology', report_type: 'Lipid profile', ocr_status: 'done', file_url: '#', results_count: 8, abnormal_count: 1 },
  { type: 'prescription', id: 'rx_5', date: '2022-11-12', provider_name: 'Dr. Meera Iyer', medicines: [{ name: 'Carbimazole', dosage: '5 mg twice daily' }, { name: 'Propranolol', dosage: '10 mg at night' }], notes: '' },
  { type: 'report', id: 'r_31', date: '2022-11-09', provider_name: 'City Diagnostics', report_type: 'Thyroid profile', ocr_status: 'done', file_url: '#', results_count: 3, abnormal_count: 1 },
];

export const openPrescriptions = [
  { prescription_id: 'rx_9', date: '2024-03-08', doctor_name: 'Dr. Meera Iyer', medicines: [{ name: 'Iron-folic acid', dosage: '1 tablet daily' }] },
  { prescription_id: 'rx_5', date: '2022-11-12', doctor_name: 'Dr. Meera Iyer', medicines: [{ name: 'Carbimazole', dosage: '5 mg twice daily' }, { name: 'Propranolol', dosage: '10 mg at night' }] },
];
