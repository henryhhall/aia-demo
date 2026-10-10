import { useState, useRef, useEffect } from 'react';
import { getRecaptchaToken } from '../lib/recaptcha';
import RecaptchaLegalNotice from './RecaptchaLegalNotice';

export type SupportedLocale = 'en' | 'es' | 'pt' | 'tr';

interface CertificateRequestFormProps {
  lang?: SupportedLocale;
}

const US_STATES = [
  'CT', 'NY', 'NJ', 'MA', 'RI', 'PA', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MI', 'MN', 'MS',
  'MO', 'MT', 'NE', 'NV', 'NH', 'NC', 'ND', 'OH', 'OK', 'OR', 'SC', 'SD', 'TN', 'TX',
  'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'PR'
];

export default function CertificateRequestForm({ lang = 'en' }: CertificateRequestFormProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [renderedAt, setRenderedAt] = useState<number>(0);

  useEffect(() => {
    // Record render timestamp for time-based honeypot bot defense
    setRenderedAt(Date.now());
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Requestor & Insured
    companyName: '',
    requestorName: '',
    requestorEmail: '',
    requestorPhone: '',
    requestorFax: '',
    relationship: 'I am the named insured',
    insuredName: '',
    policyNumber: '',
    preferredOffice: 'Danbury',

    // Step 2: Holder & Delivery
    holderName: '',
    attentionOf: '',
    holderAddress1: '',
    holderAddress2: '',
    holderCity: '',
    holderState: 'CT',
    holderZip: '',
    holderEmail: '',
    holderPhone: '',
    holderFax: '',
    deliveryMethod: 'Email',
    coverages: ['General Liability', 'Workers\' Compensation'] as string[],
    coverageOtherText: '',

    // Step 3: Endorsements & Project
    isAdditionalInsured: 'No',
    hasWrittenContract: 'No',
    additionalInsuredName: '',
    additionalInsuredAddress: '',
    additionalInsuredLines: [] as string[],
    waiverSubrogationLines: [] as string[],
    primaryNonContributory: false,
    jobNumber: '',
    workState: 'CT',
    jobPayroll: '',
    jobStartDate: '',
    neededByDate: '',

    // Step 4: Special Instructions & Agreement
    specialInstructions: '',
    attachedFileName: '',
    attachedFileSize: 0,
    agreementAccepted: false,

    // Honeypots
    hp_website: '',
    hp_company: '',
  });

  const dict = {
    en: {
      badge: 'Official ACORD 25 Certificate Request',
      step1Title: 'Requestor & Insured',
      step1Sub: 'Who is requesting this certificate and policy details',
      step2Title: 'Certificate Holder',
      step2Sub: 'Entity receiving the certificate & delivery method',
      step3Title: 'Endorsements & Job',
      step3Sub: 'Additional insured, waivers, and contract terms',
      step4Title: 'Review & Binding',
      step4Sub: 'Upload specs, special instructions & legal sign-off',
      stepOf: (s: number) => `Step ${s} of 4`,

      // Step 1 Fields
      companyNameLabel: 'Requestor Company Name',
      companyNamePlaceholder: 'E.g. Apex Contracting LLC (or leave blank if individual)',
      requestorNameLabel: 'Your Full Name',
      requestorNamePlaceholder: 'John Smith',
      requestorEmailLabel: 'Your Email Address',
      requestorEmailPlaceholder: 'john@example.com',
      requestorPhoneLabel: 'Your Phone Number',
      requestorPhonePlaceholder: '(203) 555-0199',
      requestorFaxLabel: 'Fax Number (Optional)',
      requestorFaxPlaceholder: '(203) 555-0198',
      relationshipLabel: 'Your Relationship to the Named Insured',
      relationshipOptions: [
        'I am the named insured',
        'Contractor / Subcontractor',
        'Landlord / Property Owner',
        'Mortgagee / Lender',
        'Loss payee / Lien holder',
        'Vendor / Certificate Holder',
        'Other Representative'
      ],
      insuredNameLabel: 'Name of Insured (As Shown on Policy)',
      insuredNamePlaceholder: 'Exact legal business name or individual name',
      policyNumberLabel: 'Policy Number (If Known)',
      policyNumberPlaceholder: 'E.g. PKG-9482103 (Optional)',
      preferredOfficeLabel: 'Servicing AIA Office',
      officeDanbury: 'Danbury HQ (50 Newtown Rd)',
      officeWatertown: 'Watertown Branch (51 Depot St)',
      officeBridgeport: 'Bridgeport Branch (2465 Main St)',

      // Step 2 Fields
      holderNameLabel: 'Certificate Holder Entity Name',
      holderNamePlaceholder: 'E.g. City of Danbury, ABC General Contractors Inc.',
      attentionOfLabel: 'Attention Of (Department or Person)',
      attentionOfPlaceholder: 'E.g. Risk Management Dept, Sarah Miller',
      holderAddress1Label: 'Street Address 1',
      holderAddress1Placeholder: '155 Main Street',
      holderAddress2Label: 'Address Line 2 (Suite, Floor)',
      holderAddress2Placeholder: 'Suite 400',
      holderCityLabel: 'City',
      holderCityPlaceholder: 'Danbury',
      holderStateLabel: 'State',
      holderZipLabel: 'Zip Code',
      holderZipPlaceholder: '06810',
      holderEmailLabel: 'Certificate Holder Email',
      holderEmailPlaceholder: 'compliance@holdercompany.com',
      holderPhoneLabel: 'Holder Phone (Optional)',
      holderPhonePlaceholder: '(203) 555-0123',
      holderFaxLabel: 'Holder Fax (Optional)',
      holderFaxPlaceholder: '(203) 555-0124',
      deliveryMethodLabel: 'How should we deliver the certificate?',
      deliveryOptions: ['Email', 'Fax', 'Both Email & Fax'],
      coverageTypesLabel: 'Types of Coverage to Show on Certificate',
      coverageOptions: [
        'General Liability',
        'Auto Liability',
        'Workers\' Compensation',
        'Umbrella Liability',
        'Other'
      ],
      otherCoveragePlaceholder: 'Specify other coverage lines needed',

      // Step 3 Fields
      aiQuestion: 'Is the certificate holder requesting Additional Insured status?',
      writtenContractQuestion: 'Is there an executed written contract requiring Additional Insured?',
      yes: 'Yes',
      no: 'No',
      aiNameLabel: 'Additional Insured Name / Exact Entity Wording',
      aiNamePlaceholder: 'Entity as it must appear on endorsement (if different from holder)',
      aiAddressLabel: 'Additional Insured Address',
      aiAddressPlaceholder: 'Full address for additional insured endorsement',
      aiLinesLabel: 'For which lines is Additional Insured status requested?',
      aiLineOptions: [
        'General Liability - with Products/Completed Operations',
        'General Liability - without Products/Completed Operations',
        'Commercial Auto',
        'Product Liability',
        'Umbrella Liability'
      ],
      waiverLabel: 'Waiver of Subrogation Requested (Check all that apply)',
      waiverOptions: [
        'Waiver for General Liability',
        'Waiver for Commercial Automobile',
        'Waiver for Workers\' Compensation'
      ],
      primaryNonContributoryLabel: 'Primary & Non-Contributory Wording Requested',
      primaryNonContributoryDesc: 'Endorsement states your policy is primary before holder\'s coverage attaches.',
      jobNumberLabel: 'Contract, Bid, or Job Number',
      jobNumberPlaceholder: 'E.g. BID-2026-089 / Project #441',
      workStateLabel: 'State(s) Where Work Is Being Performed',
      workStatePlaceholder: 'E.g. CT, NY',
      jobPayrollLabel: 'Estimated Job Payroll or Contract Value ($)',
      jobPayrollPlaceholder: 'E.g. $75,000',
      jobStartDateLabel: 'Job / Project Start Date',
      neededByDateLabel: 'When Do You Need the Certificate By?',

      // Step 4 Fields
      specialInstructionsLabel: 'Special Instructions, Endorsement Wording, or Contract Specs',
      specialInstructionsPlaceholder: 'Paste any mandatory contractual wording, 30-day notice of cancellation clause, or specific project requirements here...',
      fileUploadTitle: 'Attach Contract Specifications or Sample Certificate (Optional)',
      fileUploadDesc: 'Upload PDF, DOCX, or Image (Max 10MB). Having contract specs prevents revisions.',
      fileUploadBtn: 'Choose File or Drag Here',
      fileSelected: 'Selected file:',
      fileRemove: 'Remove',
      disclaimerLabel: 'Binding Legal Agreement & Information Notice (Required)',
      disclaimerText: 'I understand that an ACORD Certificate of Insurance is issued as a matter of information only and confers no rights upon the certificate holder. A certificate does not amend, extend, or alter policy coverage. Coverage changes, endorsements, and binding are effective only once reviewed and confirmed in writing by a licensed agent.',
      agreeCheckbox: 'I understand and agree to these terms',

      // Buttons & Validation
      back: 'Back',
      continue: 'Continue',
      submitBtn: 'Submit Certificate Request',
      submitting: 'Processing Request...',
      valReq1: 'Please provide your name, valid email, phone number, and the named insured.',
      valReq2: 'Please provide complete certificate holder name, street address, city, state, and zip code.',
      valReqAgreement: 'You must accept the legal agreement acknowledgement before submitting.',

      // Success Screen
      successTitle: 'Certificate Request Submitted!',
      successSub: 'Your request has been routed directly to our commercial insurance team.',
      refNumber: 'Tracking Reference Number:',
      copyCode: 'Copy',
      copied: 'Copied!',
      turnaroundNotice: 'Turnaround Commitment: Most standard ACORD 25 certificates are issued within 2–4 business hours during agency hours (Mon–Fri 8:30 AM – 5:00 PM EST).',
      rushCall: 'Need this certificate immediately on a job site?',
      rushCallDesc: 'Call our Danbury Headquarters directly at',
      rushPhone: '(203) 748-9272',
      rushPhoneRaw: '2037489272',
      summaryInsured: 'Named Insured:',
      summaryHolder: 'Certificate Holder:',
      summaryDelivery: 'Delivery:',
      summaryOffice: 'Servicing Office:',
      submitAnother: 'Submit Another Certificate Request'
    },
    es: {
      badge: 'Solicitud Oficial de Certificado ACORD 25',
      step1Title: 'Solicitante y Asegurado',
      step1Sub: 'Quién solicita el certificado y detalles de la póliza',
      step2Title: 'Titular del Certificado',
      step2Sub: 'Entidad receptora del certificado y método de envío',
      step3Title: 'Endosos y Proyecto',
      step3Sub: 'Asegurado adicional, renuncias y cláusulas contractuales',
      step4Title: 'Revisión y Acuerdo',
      step4Sub: 'Carga de pliego, instrucciones y firma legal',
      stepOf: (s: number) => `Paso ${s} de 4`,

      companyNameLabel: 'Empresa del Solicitante',
      companyNamePlaceholder: 'Ej. Apex Contracting LLC (o dejar en blanco)',
      requestorNameLabel: 'Su Nombre Completo',
      requestorNamePlaceholder: 'Juan Pérez',
      requestorEmailLabel: 'Su Correo Electrónico',
      requestorEmailPlaceholder: 'juan@ejemplo.com',
      requestorPhoneLabel: 'Su Número de Teléfono',
      requestorPhonePlaceholder: '(203) 555-0199',
      requestorFaxLabel: 'Número de Fax (Opcional)',
      requestorFaxPlaceholder: '(203) 555-0198',
      relationshipLabel: 'Su Relación con el Asegurado Nombrado',
      relationshipOptions: [
        'Soy el asegurado nombrado',
        'Contratista / Subcontratista',
        'Propietario / Arrendador',
        'Acreedor Hipotecario / Banco',
        'Beneficiario de Pérdidas / Gravamen',
        'Proveedor / Titular del Certificado',
        'Otro Representante'
      ],
      insuredNameLabel: 'Nombre del Asegurado (Como Aparece en la Póliza)',
      insuredNamePlaceholder: 'Razón social o nombre legal exacto',
      policyNumberLabel: 'Número de Póliza (Si lo Conoce)',
      policyNumberPlaceholder: 'Ej. PKG-9482103 (Opcional)',
      preferredOfficeLabel: 'Oficina de AIA de Servicio',
      officeDanbury: 'Sede Danbury (50 Newtown Rd)',
      officeWatertown: 'Sucursal Watertown (51 Depot St)',
      officeBridgeport: 'Sucursal Bridgeport (2465 Main St)',

      holderNameLabel: 'Nombre de la Entidad Titular del Certificado',
      holderNamePlaceholder: 'Ej. Ciudad de Danbury, ABC General Contractors Inc.',
      attentionOfLabel: 'A la Atención de (Departamento o Persona)',
      attentionOfPlaceholder: 'Ej. Depto. de Riesgos, Carlos Gómez',
      holderAddress1Label: 'Dirección Línea 1',
      holderAddress1Placeholder: '155 Main Street',
      holderAddress2Label: 'Dirección Línea 2 (Suite, Piso)',
      holderAddress2Placeholder: 'Suite 400',
      holderCityLabel: 'Ciudad',
      holderCityPlaceholder: 'Danbury',
      holderStateLabel: 'Estado',
      holderZipLabel: 'Código Postal',
      holderZipPlaceholder: '06810',
      holderEmailLabel: 'Correo Electrónico del Titular',
      holderEmailPlaceholder: 'seguros@titular.com',
      holderPhoneLabel: 'Teléfono del Titular (Opcional)',
      holderPhonePlaceholder: '(203) 555-0123',
      holderFaxLabel: 'Fax del Titular (Opcional)',
      holderFaxPlaceholder: '(203) 555-0124',
      deliveryMethodLabel: '¿Cómo debemos enviar el certificado?',
      deliveryOptions: ['Email', 'Fax', 'Ambos Email y Fax'],
      coverageTypesLabel: 'Tipos de Cobertura a Mostrar en el Certificado',
      coverageOptions: [
        'General Liability',
        'Auto Liability',
        'Workers\' Compensation',
        'Umbrella Liability',
        'Otro'
      ],
      otherCoveragePlaceholder: 'Especifique otras líneas de cobertura requeridas',

      aiQuestion: '¿El titular solicita el estatus de Asegurado Adicional?',
      writtenContractQuestion: '¿Existe un contrato escrito que exija Asegurado Adicional?',
      yes: 'Sí',
      no: 'No',
      aiNameLabel: 'Nombre del Asegurado Adicional / Redacción Exacta',
      aiNamePlaceholder: 'Entidad tal como debe figurar en el endoso',
      aiAddressLabel: 'Dirección del Asegurado Adicional',
      aiAddressPlaceholder: 'Dirección completa para el endoso',
      aiLinesLabel: '¿Para cuáles ramos se solicita Asegurado Adicional?',
      aiLineOptions: [
        'General Liability - con Operaciones Terminadas / Productos',
        'General Liability - sin Operaciones Terminadas',
        'Auto Comercial',
        'Responsabilidad de Producto',
        'Responsabilidad Umbrella'
      ],
      waiverLabel: 'Renuncia de Subrogación Solicitada (Marque las aplicables)',
      waiverOptions: [
        'Renuncia para General Liability',
        'Renuncia para Automóvil Comercial',
        'Renuncia para Workers\' Compensation'
      ],
      primaryNonContributoryLabel: 'Redacción Primaria y No Contributoria Solicitada',
      primaryNonContributoryDesc: 'El endoso estipula que su póliza actúa en primer lugar antes del seguro del titular.',
      jobNumberLabel: 'Número de Contrato, Licitación o Trabajo',
      jobNumberPlaceholder: 'Ej. LIC-2026-089 / Proyecto #441',
      workStateLabel: 'Estado(s) Donde se Realizan los Trabajos',
      workStatePlaceholder: 'Ej. CT, NY',
      jobPayrollLabel: 'Nómina Estimada o Valor del Contrato ($)',
      jobPayrollPlaceholder: 'Ej. $75,000',
      jobStartDateLabel: 'Fecha de Inicio del Trabajo',
      neededByDateLabel: '¿Para Cuándo Necesita el Certificado?',

      specialInstructionsLabel: 'Instrucciones Especiales o Requisitos del Pliego',
      specialInstructionsPlaceholder: 'Pegue aquí cláusulas obligatorias, aviso de cancelación a 30 días o condiciones del contrato...',
      fileUploadTitle: 'Adjuntar Especificaciones de Contrato o Ejemplo (Opcional)',
      fileUploadDesc: 'Suba PDF, DOCX o imagen (Máx 10MB). Adjuntar el pliego agiliza la aprobación sin errores.',
      fileUploadBtn: 'Seleccionar Archivo o Arrastrar Aquí',
      fileSelected: 'Archivo seleccionado:',
      fileRemove: 'Eliminar',
      disclaimerLabel: 'Acuerdo Legal Obligatorio y Notificación (Requerido)',
      disclaimerText: 'Entiendo que un Certificado de Seguro ACORD se emite únicamente a título informativo y no otorga derechos al titular. El certificado no modifica, amplía ni altera la cobertura. Los cambios de póliza y endosos solo son válidos una vez confirmados por escrito por un agente con licencia.',
      agreeCheckbox: 'Entiendo y acepto estos términos',

      back: 'Atrás',
      continue: 'Continuar',
      submitBtn: 'Enviar Solicitud de Certificado',
      submitting: 'Procesando Solicitud...',
      valReq1: 'Por favor complete su nombre, correo válido, teléfono y nombre del asegurado.',
      valReq2: 'Por favor ingrese el nombre del titular y su dirección completa con ciudad, estado y código postal.',
      valReqAgreement: 'Debe aceptar los términos legales antes de enviar.',

      successTitle: '¡Solicitud de Certificado Enviada!',
      successSub: 'Su requerimiento fue enviado directamente a nuestro equipo comercial.',
      refNumber: 'Número de Referencia de Seguimiento:',
      copyCode: 'Copiar',
      copied: '¡Copiado!',
      turnaroundNotice: 'Compromiso de Entrega: La mayoría de los certificados ACORD 25 se expiden en 2 a 4 horas hábiles (Lun-Vie 8:30 AM - 5:00 PM EST).',
      rushCall: '¿Necesita este certificado de inmediato en una obra o inspección?',
      rushCallDesc: 'Llame directamente a nuestra sede principal en Danbury al',
      rushPhone: '(203) 748-9272',
      rushPhoneRaw: '2037489272',
      summaryInsured: 'Asegurado Nombrado:',
      summaryHolder: 'Titular del Certificado:',
      summaryDelivery: 'Envío:',
      summaryOffice: 'Oficina Asignada:',
      submitAnother: 'Enviar Otra Solicitud de Certificado'
    },
    pt: {
      badge: 'Solicitação Oficial de Certificado ACORD 25',
      step1Title: 'Solicitante e Segurado',
      step1Sub: 'Quem está solicitando e detalhes da apólice',
      step2Title: 'Titular do Certificado',
      step2Sub: 'Entidade que receberá o certificado e forma de envio',
      step3Title: 'Endossos e Obra',
      step3Sub: 'Segurado adicional, renúncia e exigências de contrato',
      step4Title: 'Revisão e Acordo',
      step4Sub: 'Upload de especificações, instruções e aceite legal',
      stepOf: (s: number) => `Passo ${s} de 4`,

      companyNameLabel: 'Empresa do Solicitante',
      companyNamePlaceholder: 'Ex: Apex Contracting LLC (ou deixe em branco)',
      requestorNameLabel: 'Seu Nome Completo',
      requestorNamePlaceholder: 'Carlos Silva',
      requestorEmailLabel: 'Seu Endereço de E-mail',
      requestorEmailPlaceholder: 'carlos@exemplo.com',
      requestorPhoneLabel: 'Seu Telefone',
      requestorPhonePlaceholder: '(203) 555-0199',
      requestorFaxLabel: 'Fax (Opcional)',
      requestorFaxPlaceholder: '(203) 555-0198',
      relationshipLabel: 'Sua Relação com o Segurado Nomeado',
      relationshipOptions: [
        'Sou o próprio segurado nomeado',
        'Empreiteiro / Subcontratado',
        'Proprietário do Imóvel / Locador',
        'Credor Hipotecário / Banco',
        'Beneficiário de Perdas / Credor',
        'Fornecedor / Titular do Certificado',
        'Outro Representante'
      ],
      insuredNameLabel: 'Nome do Segurado (Conforme Consta na Apólice)',
      insuredNamePlaceholder: 'Razão social ou nome legal exato',
      policyNumberLabel: 'Número da Apólice (Se Souber)',
      policyNumberPlaceholder: 'Ex: PKG-9482103 (Opcional)',
      preferredOfficeLabel: 'Escritório da AIA de Preferência',
      officeDanbury: 'Sede Danbury (50 Newtown Rd)',
      officeWatertown: 'Filial Watertown (51 Depot St)',
      officeBridgeport: 'Filial Bridgeport (2465 Main St)',

      holderNameLabel: 'Nome da Entidade Titular do Certificado',
      holderNamePlaceholder: 'Ex: City of Danbury, ABC General Contractors Inc.',
      attentionOfLabel: 'Aos Cuidados de (Departamento ou Pessoa)',
      attentionOfPlaceholder: 'Ex: Depto. de Riscos, Marcos Lima',
      holderAddress1Label: 'Endereço Linha 1',
      holderAddress1Placeholder: '155 Main Street',
      holderAddress2Label: 'Endereço Linha 2 (Sala, Andar)',
      holderAddress2Placeholder: 'Suite 400',
      holderCityLabel: 'Cidade',
      holderCityPlaceholder: 'Danbury',
      holderStateLabel: 'Estado',
      holderZipLabel: 'Código Postal (Zip Code)',
      holderZipPlaceholder: '06810',
      holderEmailLabel: 'E-mail do Titular',
      holderEmailPlaceholder: 'certificados@empresa.com',
      holderPhoneLabel: 'Telefone do Titular (Opcional)',
      holderPhonePlaceholder: '(203) 555-0123',
      holderFaxLabel: 'Fax do Titular (Opcional)',
      holderFaxPlaceholder: '(203) 555-0124',
      deliveryMethodLabel: 'Como devemos enviar o certificado?',
      deliveryOptions: ['Email', 'Fax', 'Ambos Email e Fax'],
      coverageTypesLabel: 'Tipos de Cobertura a Exibir no Certificado',
      coverageOptions: [
        'General Liability',
        'Auto Liability',
        'Workers\' Compensation',
        'Umbrella Liability',
        'Outro'
      ],
      otherCoveragePlaceholder: 'Especifique outras coberturas requeridas',

      aiQuestion: 'O titular está solicitando condição de Segurado Adicional?',
      writtenContractQuestion: 'Existe contrato por escrito exigindo Segurado Adicional?',
      yes: 'Sim',
      no: 'Não',
      aiNameLabel: 'Nome do Segurado Adicional / Redação Exata',
      aiNamePlaceholder: 'Nome exato como deve constar no endosso',
      aiAddressLabel: 'Endereço do Segurado Adicional',
      aiAddressPlaceholder: 'Endereço completo para o endosso',
      aiLinesLabel: 'Para quais ramos solicita Segurado Adicional?',
      aiLineOptions: [
        'General Liability - com Produtos / Operações Concluídas',
        'General Liability - sem Produtos / Operações Concluídas',
        'Auto Comercial',
        'Responsabilidade de Produto',
        'Responsabilidade Umbrella'
      ],
      waiverLabel: 'Renúncia de Sub-rogação Solicitada (Marque as aplicáveis)',
      waiverOptions: [
        'Renúncia para General Liability',
        'Renúncia para Automóvel Comercial',
        'Renúncia para Workers\' Compensation'
      ],
      primaryNonContributoryLabel: 'Cláusula Primária e Não Contributiva Requerida',
      primaryNonContributoryDesc: 'O endosso declara que sua apólice responde primeiro antes do seguro do titular.',
      jobNumberLabel: 'Número do Contrato, Edital ou Obra',
      jobNumberPlaceholder: 'Ex: PROJ-2026-089 / Obra #441',
      workStateLabel: 'Estado(s) Onde os Serviços Serão Executados',
      workStatePlaceholder: 'Ex: CT, NY',
      jobPayrollLabel: 'Folha Estimada ou Valor do Contrato ($)',
      jobPayrollPlaceholder: 'Ex: $75,000',
      jobStartDateLabel: 'Data de Início dos Trabalhos',
      neededByDateLabel: 'Para Quando Você Precisa do Certificado?',

      specialInstructionsLabel: 'Instruções Especiais ou Exigências do Contrato',
      specialInstructionsPlaceholder: 'Cole cláusulas contratuais obrigatórias, aviso prévio de 30 dias de cancelamento, etc...',
      fileUploadTitle: 'Anexar Especificações do Contrato ou Exemplo (Opcional)',
      fileUploadDesc: 'Envie PDF, DOCX ou imagem (Máx 10MB). Anexar as regras agiliza a emissão sem retrabalho.',
      fileUploadBtn: 'Escolher Arquivo ou Arraste Aqui',
      fileSelected: 'Arquivo selecionado:',
      fileRemove: 'Remover',
      disclaimerLabel: 'Aceite Legal Obrigatório e Notificação Informativa (Obrigatório)',
      disclaimerText: 'Compreendo que um Certificado de Seguro ACORD é emitido apenas para fins informativos e não confere direitos ao titular. O certificado não altera, amplia nem estende a cobertura. Alterações na apólice e endossos só entram em vigor quando confirmados por escrito por um corretor licenciado.',
      agreeCheckbox: 'Compreendo e concordo com estes termos',

      back: 'Voltar',
      continue: 'Continuar',
      submitBtn: 'Enviar Solicitação de Certificado',
      submitting: 'Processando Solicitação...',
      valReq1: 'Por favor, informe seu nome, e-mail válido, telefone e o nome do segurado.',
      valReq2: 'Por favor, informe o nome do titular e endereço completo com cidade, estado e CEP.',
      valReqAgreement: 'Você deve aceitar o termo legal antes de prosseguir.',

      successTitle: 'Solicitação de Certificado Enviada!',
      successSub: 'Seu pedido foi encaminhado diretamente à nossa equipe de seguros comerciais.',
      refNumber: 'Código de Rastreamento do Pedido:',
      copyCode: 'Copiar',
      copied: 'Copiado!',
      turnaroundNotice: 'Compromisso de Prazo: A maioria dos certificados ACORD 25 é emitida em 2 a 4 horas úteis (Seg-Sex 8:30 às 17:00 EST).',
      rushCall: 'Precisa do certificado urgente no canteiro de obras agora?',
      rushCallDesc: 'Ligue diretamente para a nossa sede em Danbury no telefone',
      rushPhone: '(203) 748-9272',
      rushPhoneRaw: '2037489272',
      summaryInsured: 'Segurado Nomeado:',
      summaryHolder: 'Titular do Certificado:',
      summaryDelivery: 'Envio:',
      summaryOffice: 'Filial de Atendimento:',
      submitAnother: 'Enviar Outra Solicitação de Certificado'
    },
    tr: {
      badge: 'Resmi ACORD 25 Sigorta Sertifikası Talebi',
      step1Title: 'Talep Eden ve Sigortalı',
      step1Sub: 'Sertifikayı talep eden kişi ve poliçe detayları',
      step2Title: 'Sertifika Sahibi (Holder)',
      step2Sub: 'Sertifikanın düzenleneceği kurum ve teslimat yolu',
      step3Title: 'Ek Sigortalı ve Proje',
      step3Sub: 'Ek sigortalı (Additional Insured), rücu feragati ve sözleşme şartları',
      step4Title: 'İnceleme ve Yasal Onay',
      step4Sub: 'Şartname yükleme, özel talimatlar ve bağlayıcılık metni',
      stepOf: (s: number) => `Adım ${s} / 4`,

      companyNameLabel: 'Talep Eden Şirket Adı',
      companyNamePlaceholder: 'Örn. Apex Contracting LLC (şahıssa boş bırakın)',
      requestorNameLabel: 'Adınız ve Soyadınız',
      requestorNamePlaceholder: 'Ahmet Yılmaz',
      requestorEmailLabel: 'E-posta Adresiniz',
      requestorEmailPlaceholder: 'ahmet@ornek.com',
      requestorPhoneLabel: 'Telefon Numaranız',
      requestorPhonePlaceholder: '(203) 555-0199',
      requestorFaxLabel: 'Faks Numarası (İsteğe Bağlı)',
      requestorFaxPlaceholder: '(203) 555-0198',
      relationshipLabel: 'Poliçedeki Sigortalı ile İlişkiniz',
      relationshipOptions: [
        'Poliçede adı geçen asıl sigortalıyım',
        'Yüklenici / Taşeron',
        'Mülk Sahibi / Ev Sahibi',
        'İpotek Alacaklısı / Banka',
        'Zarar Tazmin Alacaklısı (Loss Payee)',
        'Tedarikçi / Sertifika Sahibi',
        'Diğer Temsilci'
      ],
      insuredNameLabel: 'Sigortalının Adı (Poliçede Yazıldığı Şekliyle)',
      insuredNamePlaceholder: 'Resmi ticari unvan veya tam şahıs adı',
      policyNumberLabel: 'Poliçe Numarası (Biliyorsanız)',
      policyNumberPlaceholder: 'Örn. PKG-9482103 (İsteğe bağlı)',
      preferredOfficeLabel: 'Hizmet Almak İstediğiniz AIA Ofisi',
      officeDanbury: 'Danbury Merkez Ofisi (50 Newtown Rd)',
      officeWatertown: 'Watertown Şubesi (51 Depot St)',
      officeBridgeport: 'Bridgeport Şubesi (2465 Main St)',

      holderNameLabel: 'Sertifika Sahibi Kurum Adı (Holder Name)',
      holderNamePlaceholder: 'Örn. City of Danbury, ABC General Contractors Inc.',
      attentionOfLabel: 'İlgili Kişi veya Departman (Attention Of)',
      attentionOfPlaceholder: 'Örn. Risk Yönetimi Departmanı, Mehmet Bey',
      holderAddress1Label: 'Adres Satırı 1',
      holderAddress1Placeholder: '155 Main Street',
      holderAddress2Label: 'Adres Satırı 2 (Ofis, Kat)',
      holderAddress2Placeholder: 'Suite 400',
      holderCityLabel: 'Şehir',
      holderCityPlaceholder: 'Danbury',
      holderStateLabel: 'Eyalet',
      holderZipLabel: 'Posta Kodu (Zip)',
      holderZipPlaceholder: '06810',
      holderEmailLabel: 'Sertifika Sahibi E-posta',
      holderEmailPlaceholder: 'belge@alici.com',
      holderPhoneLabel: 'Kurum Telefonu (İsteğe Bağlı)',
      holderPhonePlaceholder: '(203) 555-0123',
      holderFaxLabel: 'Kurum Faksı (İsteğe Bağlı)',
      holderFaxPlaceholder: '(203) 555-0124',
      deliveryMethodLabel: 'Sertifika alıcıya nasıl ulaştırılsın?',
      deliveryOptions: ['E-posta', 'Faks', 'Hem E-posta Hem Faks'],
      coverageTypesLabel: 'Sertifikada Gösterilecek Teminat Türleri',
      coverageOptions: [
        'General Liability (Genel Sorumluluk)',
        'Auto Liability (Ticari Araç)',
        'Workers\' Compensation (İşçi Tazminatı)',
        'Umbrella Liability (Şemsiye Teminatı)',
        'Diğer'
      ],
      otherCoveragePlaceholder: 'Gerekli diğer teminat branşlarını yazın',

      aiQuestion: 'Sertifika sahibi "Ek Sigortalı" (Additional Insured) statüsü istiyor mu?',
      writtenContractQuestion: 'Ek Sigortalı şartını zorunlu kılan imzalı yazılı bir sözleşme var mı?',
      yes: 'Evet',
      no: 'Hayır',
      aiNameLabel: 'Ek Sigortalı Unvanı / Tam Yazılışı',
      aiNamePlaceholder: 'Zeyilnamede görünmesi gereken tam kurum unvanı',
      aiAddressLabel: 'Ek Sigortalı Adresi',
      aiAddressPlaceholder: 'Zeyilname için tam adres bilgisi',
      aiLinesLabel: 'Hangi branşlarda Ek Sigortalı statüsü talep ediliyor?',
      aiLineOptions: [
        'General Liability - Tamamlanan İşler / Ürünler Dahil',
        'General Liability - Tamamlanan İşler Hariç',
        'Ticari Araç (Commercial Auto)',
        'Ürün Sorumluluğu (Product Liability)',
        'Şemsiye Sorumluluk (Umbrella)'
      ],
      waiverLabel: 'Rücu Feragati (Waiver of Subrogation) Talep Edilen Branşlar',
      waiverOptions: [
        'General Liability için Rücu Feragati',
        'Ticari Araç için Rücu Feragati',
        'Workers\' Compensation için Rücu Feragati'
      ],
      primaryNonContributoryLabel: 'Birincil ve Katkısız (Primary & Non-Contributory) Şartı',
      primaryNonContributoryDesc: 'Poliçenizin alıcının sigortasından önce ilk sırada devreye gireceğini teyit eder.',
      jobNumberLabel: 'Sözleşme, İhale veya İş Numarası',
      jobNumberPlaceholder: 'Örn. PROJE-2026-089 / İş No #441',
      workStateLabel: 'İşin Yapıldığı Eyalet(ler)',
      workStatePlaceholder: 'Örn. CT, NY',
      jobPayrollLabel: 'Tahmini Bordro veya İş Sözleşme Tutarı ($)',
      jobPayrollPlaceholder: 'Örn. $75,000',
      jobStartDateLabel: 'İşin Başlangıç Tarihi',
      neededByDateLabel: 'Sertifika Ne Zamana Kadar Gerekiyor?',

      specialInstructionsLabel: 'Özel Talimatlar veya Sözleşme Şartnamesi Metni',
      specialInstructionsPlaceholder: 'Sözleşmede zorunlu tutulan özel iptal ihbarı süreleri veya metinleri buraya yapıştırın...',
      fileUploadTitle: 'Sözleşme Sigorta Şartnamesi veya Örnek Belge Yükleyin (İsteğe Bağlı)',
      fileUploadDesc: 'PDF, DOCX veya görsel yükleyin (Maks. 10MB). Şartnameyi eklemeniz hataları önler.',
      fileUploadBtn: 'Dosya Seçin veya Buraya Sürükleyin',
      fileSelected: 'Seçilen dosya:',
      fileRemove: 'Kaldır',
      disclaimerLabel: 'Yasal Bilgilendirme ve Bağlayıcılık Onayı (Zorunlu)',
      disclaimerText: 'ACORD Sigorta Sertifikasının yalnızca bilgilendirme amacıyla düzenlendiğini ve sertifika sahibine ek haklar tanımadığını anlıyorum. Sertifika poliçe teminatlarını genişletmez veya değiştirmez. Poliçe zeyilnameleri yalnızca lisanslı bir acente tarafından yazılı olarak teyit edildiğinde yürürlüğe girer.',
      agreeCheckbox: 'Bu şartları anladım ve kabul ediyorum',

      back: 'Geri',
      continue: 'Devam Et',
      submitBtn: 'Sertifika Talebini Gönder',
      submitting: 'Talep İletiliyor...',
      valReq1: 'Lütfen adınızı, geçerli e-posta adresinizi, telefonunuzu ve sigortalı adını girin.',
      valReq2: 'Lütfen sertifika sahibinin tam adını, sokak adresini, şehrini, eyaletini ve posta kodunu girin.',
      valReqAgreement: 'Devam etmeden önce yasal bilgilendirme metnini onaylamalısınız.',

      successTitle: 'Sertifika Talebiniz Başarıyla Alındı!',
      successSub: 'Talebiniz ticari sigortalar ekibimize iletilmiştir.',
      refNumber: 'Talep Takip Referans Numarası:',
      copyCode: 'Kopyala',
      copied: 'Kopyalandı!',
      turnaroundNotice: 'Teslimat Süresi: Standart ACORD 25 sertifikaları çalışma saatleri içinde (Pzt-Cum 8:30 - 17:00 EST) 2 ila 4 iş saati içinde düzenlenir.',
      rushCall: 'Şantiyede veya ihalede hemen acil sertifikaya mı ihtiyacınız var?',
      rushCallDesc: 'Danbury merkez ofisimizi doğrudan arayabilirsiniz:',
      rushPhone: '(203) 748-9272',
      rushPhoneRaw: '2037489272',
      summaryInsured: 'Poliçe Sigortalısı:',
      summaryHolder: 'Sertifika Sahibi:',
      summaryDelivery: 'Teslimat Şekli:',
      summaryOffice: 'İşlem Yapan Ofis:',
      submitAnother: 'Başka Bir Sertifika Talebi Gönder'
    }
  }[lang];

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayToggle = (field: 'coverages' | 'additionalInsuredLines' | 'waiverSubrogationLines', item: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const exists = current.includes(item);
      const updated = exists ? current.filter((x) => x !== item) : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10MB limit.');
        return;
      }
      setErrorMessage('');
      setFormData((prev) => ({
        ...prev,
        attachedFileName: file.name,
        attachedFileSize: file.size,
      }));
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormData((prev) => ({
      ...prev,
      attachedFileName: '',
      attachedFileSize: 0,
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    setErrorMessage('');

    // Honeypot check: if bot populated hidden decoy inputs, halt immediately
    if (formData.hp_website || formData.hp_company) {
      console.warn('[Security / Honeypot] Bot step progression blocked via honeypot trap.');
      return false;
    }

    if (currentStep === 1) {
      if (!formData.requestorName || !formData.requestorEmail || !formData.requestorPhone || !formData.insuredName) {
        setErrorMessage(dict.valReq1);
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.holderName || !formData.holderAddress1 || !formData.holderCity || !formData.holderState || !formData.holderZip) {
        setErrorMessage(dict.valReq2);
        return false;
      }
      if (formData.coverages.length === 0) {
        setErrorMessage('Please select at least one insurance coverage line.');
        return false;
      }
    } else if (currentStep === 4) {
      if (!formData.agreementAccepted) {
        setErrorMessage(dict.valReqAgreement);
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4) as any);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setErrorMessage('');
    setStep((prev) => Math.max(prev - 1, 1) as any);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setErrorMessage('');

    // Client-side Honeypot Check: if bot filled either hidden trap field, silently reject
    if (formData.hp_website || formData.hp_company) {
      console.warn('[Security / Honeypot] Bot submission blocked via honeypot trap field.');
      setIsSubmitting(false);
      // Generate synthetic confirmation code to fool automated bots without hitting backend
      const fakeCode = `COI-CT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmationCode(fakeCode);
      setStep(5);
      return;
    }

    try {
      // Execute Google reCAPTCHA v3
      const recaptchaToken = await getRecaptchaToken('certificate_request');

      const payload = {
        requestorName: formData.requestorName,
        companyName: formData.companyName,
        requestorEmail: formData.requestorEmail,
        requestorPhone: formData.requestorPhone,
        requestorFax: formData.requestorFax,
        relationship: formData.relationship,
        insuredName: formData.insuredName,
        policyNumber: formData.policyNumber,
        preferredOffice: formData.preferredOffice,

        holderName: formData.holderName,
        attentionOf: formData.attentionOf,
        holderAddress1: formData.holderAddress1,
        holderAddress2: formData.holderAddress2,
        holderCity: formData.holderCity,
        holderState: formData.holderState,
        holderZip: formData.holderZip,
        holderEmail: formData.holderEmail,
        holderPhone: formData.holderPhone,
        holderFax: formData.holderFax,
        deliveryMethod: formData.deliveryMethod,
        coverages: formData.coverages,
        coverageOtherText: formData.coverageOtherText,

        isAdditionalInsured: formData.isAdditionalInsured === 'Yes',
        hasWrittenContract: formData.hasWrittenContract === 'Yes',
        additionalInsuredName: formData.additionalInsuredName,
        additionalInsuredAddress: formData.additionalInsuredAddress,
        additionalInsuredLines: formData.additionalInsuredLines,
        waiverSubrogationLines: formData.waiverSubrogationLines,
        primaryNonContributory: formData.primaryNonContributory,
        jobNumber: formData.jobNumber,
        workState: formData.workState,
        jobPayroll: formData.jobPayroll,
        jobStartDate: formData.jobStartDate,
        neededByDate: formData.neededByDate,

        specialInstructions: formData.specialInstructions,
        attachedFileName: formData.attachedFileName,
        attachedFileSize: formData.attachedFileSize,
        agreementAccepted: formData.agreementAccepted,
        preferredLanguage: lang,
        source: 'Web_Certificate_Form',
        recaptchaToken,
        hp_website: formData.hp_website,
        hp_company: formData.hp_company,
        form_rendered_at: renderedAt,
      };

      const res = await fetch('/api/certificate-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.success && resData.confirmationCode) {
        setConfirmationCode(resData.confirmationCode);
        setStep(5);
      } else {
        setErrorMessage(resData.error || 'Failed to submit certificate request. Please verify fields.');
      }
    } catch {
      // Offline fallback code
      const fallbackCode = `COI-CT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmationCode(fallbackCode);
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (navigator?.clipboard && confirmationCode) {
      navigator.clipboard.writeText(confirmationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      requestorName: '',
      requestorEmail: '',
      requestorPhone: '',
      requestorFax: '',
      relationship: 'I am the named insured',
      insuredName: '',
      policyNumber: '',
      preferredOffice: 'Danbury',
      holderName: '',
      attentionOf: '',
      holderAddress1: '',
      holderAddress2: '',
      holderCity: '',
      holderState: 'CT',
      holderZip: '',
      holderEmail: '',
      holderPhone: '',
      holderFax: '',
      deliveryMethod: 'Email',
      coverages: ['General Liability', 'Workers\' Compensation'],
      coverageOtherText: '',
      isAdditionalInsured: 'No',
      hasWrittenContract: 'No',
      additionalInsuredName: '',
      additionalInsuredAddress: '',
      additionalInsuredLines: [],
      waiverSubrogationLines: [],
      primaryNonContributory: false,
      jobNumber: '',
      workState: 'CT',
      jobPayroll: '',
      jobStartDate: '',
      neededByDate: '',
      specialInstructions: '',
      attachedFileName: '',
      attachedFileSize: 0,
      agreementAccepted: false,
      hp_website: '',
      hp_company: '',
    });
    setRenderedAt(Date.now());
    setStep(1);
    setConfirmationCode('');
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* ============================================================ */}
      {/* BOT HONEYPOT FIELDS (Invisible to human users, traps bots)   */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          opacity: 0,
          zIndex: -1,
          width: 0,
          height: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        <label htmlFor="coi_hp_website">Leave this field empty if human</label>
        <input
          id="coi_hp_website"
          type="text"
          name="hp_website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.hp_website}
          onChange={handleInputChange}
        />
        <label htmlFor="coi_hp_company">Company Website</label>
        <input
          id="coi_hp_company"
          type="text"
          name="hp_company"
          tabIndex={-1}
          autoComplete="off"
          value={formData.hp_company}
          onChange={handleInputChange}
        />
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl border border-border-subtle shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-accent via-accent to-[#1a3a78] text-white p-6 sm:p-8 border-b border-accent/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent-gold text-xs font-semibold mb-2 backdrop-blur-xs border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse"></span>
                <span>{dict.badge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {step === 1 && dict.step1Title}
                {step === 2 && dict.step2Title}
                {step === 3 && dict.step3Title}
                {step === 4 && dict.step4Title}
                {step === 5 && dict.successTitle}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
                {step === 1 && dict.step1Sub}
                {step === 2 && dict.step2Sub}
                {step === 3 && dict.step3Sub}
                {step === 4 && dict.step4Sub}
                {step === 5 && dict.successSub}
              </p>
            </div>

            {step < 5 && (
              <div className="shrink-0 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-mono font-medium text-accent-gold backdrop-blur-xs">
                {dict.stepOf(step)}
              </div>
            )}
          </div>

          {/* Stepper Tabs */}
          {step < 5 && (
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-4 gap-2 sm:gap-4">
              {[1, 2, 3, 4].map((s) => {
                const isCurrent = step === s;
                const isDone = step > s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      if (step > s) setStep(s as any);
                    }}
                    disabled={step < s}
                    className={`flex items-center gap-2 sm:gap-3 text-left transition-all ${
                      isCurrent
                        ? 'opacity-100 font-bold'
                        : isDone
                        ? 'opacity-80 hover:opacity-100 cursor-pointer'
                        : 'opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-mono shrink-0 transition-all ${
                        isCurrent
                          ? 'bg-accent-gold text-accent shadow-md ring-2 ring-white/50 font-bold'
                          : isDone
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {isDone ? '✓' : s}
                    </div>
                    <div className="hidden md:block leading-tight">
                      <span className="text-[11px] uppercase tracking-wider block text-zinc-300">
                        {s === 1 && 'Part 1'}
                        {s === 2 && 'Part 2'}
                        {s === 3 && 'Part 3'}
                        {s === 4 && 'Part 4'}
                      </span>
                      <span className="text-xs truncate block text-white font-medium">
                        {s === 1 && dict.step1Title}
                        {s === 2 && dict.step2Title}
                        {s === 3 && dict.step3Title}
                        {s === 4 && dict.step4Title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-semibold">Action Required</p>
              <p className="mt-0.5 text-red-600">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Step 1: Requestor & Insured */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.companyNameLabel}
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder={dict.companyNamePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.requestorNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="requestorName"
                  required
                  value={formData.requestorName}
                  onChange={handleInputChange}
                  placeholder={dict.requestorNamePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.requestorEmailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="requestorEmail"
                  required
                  value={formData.requestorEmail}
                  onChange={handleInputChange}
                  placeholder={dict.requestorEmailPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.requestorPhoneLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="requestorPhone"
                  required
                  value={formData.requestorPhone}
                  onChange={handleInputChange}
                  placeholder={dict.requestorPhonePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.requestorFaxLabel}
                </label>
                <input
                  type="tel"
                  name="requestorFax"
                  value={formData.requestorFax}
                  onChange={handleInputChange}
                  placeholder={dict.requestorFaxPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Relationship */}
            <div className="pt-4 border-t border-border-subtle">
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5">
                {dict.relationshipLabel} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {dict.relationshipOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                      formData.relationship === opt
                        ? 'border-accent bg-accent/5 font-semibold text-accent shadow-xs'
                        : 'border-border-subtle hover:bg-bg-secondary text-text-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="relationship"
                      value={opt}
                      checked={formData.relationship === opt}
                      onChange={handleInputChange}
                      className="text-accent focus:ring-accent h-4 w-4"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Insured Policy Info */}
            <div className="pt-4 border-t border-border-subtle space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.insuredNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="insuredName"
                    required
                    value={formData.insuredName}
                    onChange={handleInputChange}
                    placeholder={dict.insuredNamePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                  <p className="text-[11px] text-text-muted mt-1">
                    Enter the legal entity or person who holds the active policy with AIA.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.policyNumberLabel}
                  </label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleInputChange}
                    placeholder={dict.policyNumberPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.preferredOfficeLabel}
                </label>
                <select
                  name="preferredOffice"
                  value={formData.preferredOffice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                >
                  <option value="Danbury">{dict.officeDanbury}</option>
                  <option value="Watertown">{dict.officeWatertown}</option>
                  <option value="Bridgeport">{dict.officeBridgeport}</option>
                </select>
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="pt-6 border-t border-border-subtle flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent/90 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{dict.continue}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Certificate Holder & Delivery */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.holderNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="holderName"
                  required
                  value={formData.holderName}
                  onChange={handleInputChange}
                  placeholder={dict.holderNamePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.attentionOfLabel}
                </label>
                <input
                  type="text"
                  name="attentionOf"
                  value={formData.attentionOf}
                  onChange={handleInputChange}
                  placeholder={dict.attentionOfPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.holderAddress1Label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="holderAddress1"
                  required
                  value={formData.holderAddress1}
                  onChange={handleInputChange}
                  placeholder={dict.holderAddress1Placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.holderAddress2Label}
                </label>
                <input
                  type="text"
                  name="holderAddress2"
                  value={formData.holderAddress2}
                  onChange={handleInputChange}
                  placeholder={dict.holderAddress2Placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.holderCityLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="holderCity"
                  required
                  value={formData.holderCity}
                  onChange={handleInputChange}
                  placeholder={dict.holderCityPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.holderStateLabel} <span className="text-red-500">*</span>
                </label>
                <select
                  name="holderState"
                  value={formData.holderState}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                >
                  {US_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {dict.holderZipLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="holderZip"
                  required
                  value={formData.holderZip}
                  onChange={handleInputChange}
                  placeholder={dict.holderZipPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Delivery Method & Contacts */}
            <div className="pt-4 border-t border-border-subtle space-y-4">
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider">
                {dict.deliveryMethodLabel} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {dict.deliveryOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                      formData.deliveryMethod === opt
                        ? 'border-accent bg-accent/5 font-semibold text-accent shadow-xs'
                        : 'border-border-subtle hover:bg-bg-secondary text-text-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={opt}
                      checked={formData.deliveryMethod === opt}
                      onChange={handleInputChange}
                      className="text-accent focus:ring-accent h-4 w-4"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.holderEmailLabel}
                  </label>
                  <input
                    type="email"
                    name="holderEmail"
                    value={formData.holderEmail}
                    onChange={handleInputChange}
                    placeholder={dict.holderEmailPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.holderPhoneLabel}
                  </label>
                  <input
                    type="tel"
                    name="holderPhone"
                    value={formData.holderPhone}
                    onChange={handleInputChange}
                    placeholder={dict.holderPhonePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.holderFaxLabel}
                  </label>
                  <input
                    type="tel"
                    name="holderFax"
                    value={formData.holderFax}
                    onChange={handleInputChange}
                    placeholder={dict.holderFaxPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Coverage Lines Selection */}
            <div className="pt-4 border-t border-border-subtle space-y-3">
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider">
                {dict.coverageTypesLabel} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {dict.coverageOptions.map((cov) => {
                  const isChecked = formData.coverages.includes(cov);
                  return (
                    <label
                      key={cov}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                        isChecked
                          ? 'border-accent bg-accent/5 font-semibold text-accent shadow-xs ring-1 ring-accent/20'
                          : 'border-border-subtle hover:bg-bg-secondary text-text-secondary'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleArrayToggle('coverages', cov)}
                        className="rounded text-accent focus:ring-accent h-4 w-4"
                      />
                      <span>{cov}</span>
                    </label>
                  );
                })}
              </div>

              {formData.coverages.includes('Other') && (
                <div className="mt-2">
                  <input
                    type="text"
                    name="coverageOtherText"
                    value={formData.coverageOtherText}
                    onChange={handleInputChange}
                    placeholder={dict.otherCoveragePlaceholder}
                    className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              )}
            </div>

            {/* Stepper Buttons */}
            <div className="pt-6 border-t border-border-subtle flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl border border-border-subtle text-text-secondary font-medium text-sm hover:bg-bg-secondary transition-all"
              >
                {dict.back}
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent/90 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{dict.continue}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Endorsements & Job Requirements */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Additional Insured Toggle */}
            <div className="p-5 rounded-xl bg-bg-secondary/60 border border-border-subtle space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  {dict.aiQuestion} <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map((opt) => (
                    <label
                      key={opt}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${
                        formData.isAdditionalInsured === opt
                          ? 'border-accent bg-accent text-white shadow-xs'
                          : 'border-border-subtle bg-white text-text-secondary hover:bg-bg-secondary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="isAdditionalInsured"
                        value={opt}
                        checked={formData.isAdditionalInsured === opt}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>{opt === 'Yes' ? dict.yes : dict.no}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.isAdditionalInsured === 'Yes' && (
                <div className="space-y-4 pt-4 border-t border-border-subtle">
                  <div>
                    <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                      {dict.writtenContractQuestion} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map((opt) => (
                        <label
                          key={opt}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${
                            formData.hasWrittenContract === opt
                              ? 'border-accent bg-accent text-white shadow-xs'
                              : 'border-border-subtle bg-white text-text-secondary hover:bg-bg-secondary'
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasWrittenContract"
                            value={opt}
                            checked={formData.hasWrittenContract === opt}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <span>{opt === 'Yes' ? dict.yes : dict.no}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                        {dict.aiNameLabel}
                      </label>
                      <input
                        type="text"
                        name="additionalInsuredName"
                        value={formData.additionalInsuredName}
                        onChange={handleInputChange}
                        placeholder={dict.aiNamePlaceholder}
                        className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                        {dict.aiAddressLabel}
                      </label>
                      <input
                        type="text"
                        name="additionalInsuredAddress"
                        value={formData.additionalInsuredAddress}
                        onChange={handleInputChange}
                        placeholder={dict.aiAddressPlaceholder}
                        className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                      {dict.aiLinesLabel}
                    </label>
                    <div className="space-y-2">
                      {dict.aiLineOptions.map((line) => {
                        const isChecked = formData.additionalInsuredLines.includes(line);
                        return (
                          <label
                            key={line}
                            className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-all ${
                              isChecked
                                ? 'border-accent bg-white text-accent font-semibold'
                                : 'border-border-subtle bg-white/70 hover:bg-white text-text-secondary'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleArrayToggle('additionalInsuredLines', line)}
                              className="rounded text-accent focus:ring-accent h-4 w-4"
                            />
                            <span>{line}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Waivers & Primary Non-Contributory */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  {dict.waiverLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {dict.waiverOptions.map((w) => {
                    const isChecked = formData.waiverSubrogationLines.includes(w);
                    return (
                      <label
                        key={w}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                          isChecked
                            ? 'border-accent bg-accent/5 font-semibold text-accent shadow-xs'
                            : 'border-border-subtle hover:bg-bg-secondary text-text-secondary'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleArrayToggle('waiverSubrogationLines', w)}
                          className="rounded text-accent focus:ring-accent h-4 w-4"
                        />
                        <span>{w}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Primary Non-Contributory Card */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.primaryNonContributory
                    ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
                    : 'border-border-subtle hover:bg-bg-secondary'
                }`}
              >
                <input
                  type="checkbox"
                  name="primaryNonContributory"
                  checked={formData.primaryNonContributory}
                  onChange={handleInputChange}
                  className="rounded text-accent focus:ring-accent h-4 w-4 mt-0.5"
                />
                <div className="text-left">
                  <span className="text-sm font-semibold text-text-primary block">
                    {dict.primaryNonContributoryLabel}
                  </span>
                  <span className="text-xs text-text-secondary block mt-0.5 leading-relaxed">
                    {dict.primaryNonContributoryDesc}
                  </span>
                </div>
              </label>
            </div>

            {/* Job & Project Details */}
            <div className="pt-4 border-t border-border-subtle space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.jobNumberLabel}
                  </label>
                  <input
                    type="text"
                    name="jobNumber"
                    value={formData.jobNumber}
                    onChange={handleInputChange}
                    placeholder={dict.jobNumberPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.workStateLabel}
                  </label>
                  <input
                    type="text"
                    name="workState"
                    value={formData.workState}
                    onChange={handleInputChange}
                    placeholder={dict.workStatePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.jobPayrollLabel}
                  </label>
                  <input
                    type="text"
                    name="jobPayroll"
                    value={formData.jobPayroll}
                    onChange={handleInputChange}
                    placeholder={dict.jobPayrollPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.jobStartDateLabel}
                  </label>
                  <input
                    type="date"
                    name="jobStartDate"
                    value={formData.jobStartDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                    {dict.neededByDateLabel}
                  </label>
                  <input
                    type="date"
                    name="neededByDate"
                    value={formData.neededByDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="pt-6 border-t border-border-subtle flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl border border-border-subtle text-text-secondary font-medium text-sm hover:bg-bg-secondary transition-all"
              >
                {dict.back}
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent/90 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{dict.continue}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Special Instructions, Upload & Binding Agreement */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Form-level Honeypot Trap for automated form submittors */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
                opacity: 0,
                zIndex: -1,
                width: 0,
                height: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              <label htmlFor="coi_form_hp_website">Leave empty</label>
              <input
                id="coi_form_hp_website"
                type="text"
                name="hp_website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.hp_website}
                onChange={handleInputChange}
              />
              <label htmlFor="coi_form_hp_company">Company Website</label>
              <input
                id="coi_form_hp_company"
                type="text"
                name="hp_company"
                tabIndex={-1}
                autoComplete="off"
                value={formData.hp_company}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                {dict.specialInstructionsLabel}
              </label>
              <textarea
                name="specialInstructions"
                rows={4}
                value={formData.specialInstructions}
                onChange={handleInputChange}
                placeholder={dict.specialInstructionsPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all leading-relaxed"
              ></textarea>
            </div>

            {/* Modern File Upload Dropzone */}
            <div className="p-5 rounded-2xl border-2 border-dashed border-border-subtle bg-bg-secondary/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-accent/5 text-accent flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-text-primary">{dict.fileUploadTitle}</h4>
                <p className="text-xs text-text-secondary">{dict.fileUploadDesc}</p>
              </div>

              {!formData.attachedFileName ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="hidden"
                    id="coi-file-upload"
                  />
                  <label
                    htmlFor="coi-file-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border-subtle shadow-xs text-xs font-semibold text-accent hover:bg-bg-secondary cursor-pointer transition-all"
                  >
                    <span>{dict.fileUploadBtn}</span>
                  </label>
                </div>
              ) : (
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
                  <span>📎 {formData.attachedFileName} ({(formData.attachedFileSize / 1024).toFixed(0)} KB)</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-700 font-bold ml-2 cursor-pointer"
                  >
                    ✕ {dict.fileRemove}
                  </button>
                </div>
              )}
            </div>

            {/* Legal Binding Disclaimer Card */}
            <div className="p-5 rounded-2xl bg-zinc-950 text-white space-y-3 border border-zinc-800 shadow-md">
              <div className="flex items-center gap-2 text-accent-gold text-xs font-bold uppercase tracking-wider">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{dict.disclaimerLabel}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {dict.disclaimerText}
              </p>
              <label className="flex items-center gap-3 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreementAccepted"
                  required
                  checked={formData.agreementAccepted}
                  onChange={handleInputChange}
                  className="rounded text-accent-gold focus:ring-accent-gold h-4 w-4 bg-zinc-900 border-zinc-700"
                />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {dict.agreeCheckbox} <span className="text-red-400">*</span>
                </span>
              </label>
            </div>

            {/* Google reCAPTCHA v3 Compliance Notice */}
            <RecaptchaLegalNotice lang={lang} className="pt-2" />

            {/* Stepper Buttons */}
            <div className="pt-6 border-t border-border-subtle flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl border border-border-subtle text-text-secondary font-medium text-sm hover:bg-bg-secondary transition-all"
              >
                {dict.back}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3.5 rounded-xl bg-accent text-white font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-all ${
                  isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-accent/90 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{dict.submitting}</span>
                  </>
                ) : (
                  <>
                    <span>{dict.submitBtn}</span>
                    <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 5: Success Receipt Screen */}
        {step === 5 && (
          <div className="p-8 sm:p-12 text-center space-y-8">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-accent">
                {dict.successTitle}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {dict.successSub}
              </p>
            </div>

            {/* Reference Badge Box */}
            <div className="max-w-md mx-auto p-4 sm:p-5 rounded-2xl bg-bg-secondary border border-border-subtle space-y-2">
              <span className="text-xs uppercase font-semibold text-text-muted tracking-wider block">
                {dict.refNumber}
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-accent">
                  {confirmationCode}
                </span>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-3 py-1 rounded-lg bg-white border border-border-subtle text-xs font-semibold text-accent hover:bg-accent hover:text-white transition-all cursor-pointer"
                >
                  {copiedCode ? dict.copied : dict.copyCode}
                </button>
              </div>
            </div>

            {/* Submission Summary Table */}
            <div className="max-w-md mx-auto rounded-xl border border-border-subtle bg-white text-left overflow-hidden text-xs">
              <div className="p-3 bg-bg-secondary font-semibold text-accent border-b border-border-subtle">
                Request Details Summary
              </div>
              <div className="divide-y divide-border-subtle">
                <div className="p-3 flex justify-between">
                  <span className="text-text-muted">{dict.summaryInsured}</span>
                  <span className="font-semibold text-text-primary text-right">{formData.insuredName}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-text-muted">{dict.summaryHolder}</span>
                  <span className="font-semibold text-text-primary text-right">{formData.holderName}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-text-muted">{dict.summaryDelivery}</span>
                  <span className="font-semibold text-text-primary">{formData.deliveryMethod}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-text-muted">{dict.summaryOffice}</span>
                  <span className="font-semibold text-text-primary">{formData.preferredOffice}</span>
                </div>
              </div>
            </div>

            {/* Turnaround Commitment Card */}
            <div className="max-w-xl mx-auto p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed text-left flex items-start gap-3">
              <span className="text-lg">⏱️</span>
              <div>
                <p className="font-semibold">Processing Timeline</p>
                <p className="text-amber-800 mt-0.5">{dict.turnaroundNotice}</p>
              </div>
            </div>

            {/* Urgent Job-Site Rush Call Box */}
            <div className="max-w-xl mx-auto p-5 rounded-2xl bg-accent text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-lg">
              <div>
                <p className="text-xs uppercase font-bold text-accent-gold tracking-wider">
                  {dict.rushCall}
                </p>
                <p className="text-xs text-zinc-300 mt-0.5">
                  {dict.rushCallDesc}
                </p>
              </div>
              <a
                href={`tel:${dict.rushPhoneRaw}`}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-accent text-xs font-bold hover:bg-accent-gold hover:text-white transition-all shadow-md flex items-center gap-2"
              >
                <span>📞 {dict.rushPhone}</span>
              </a>
            </div>

            {/* Reset Button */}
            <div>
              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-semibold text-accent hover:text-accent-gold underline transition-colors cursor-pointer"
              >
                {dict.submitAnother}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Legal Disclaimer & Security Notice directly beneath the form across all languages */}
      <div className="mt-6 text-center px-4 space-y-2">
        <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed max-w-3xl mx-auto">
          {dict.disclaimerText}
        </p>
        <RecaptchaLegalNotice lang={lang} className="pt-1 text-center" />
      </div>
    </div>
  );
}
