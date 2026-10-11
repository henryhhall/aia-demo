import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

export interface CertificateRequestEmailProps {
  confirmationCode?: string;
  insuredName?: string;
  policyNumber?: string;
  relationship?: string;
  requestorName?: string;
  companyName?: string;
  requestorEmail?: string;
  requestorPhone?: string;
  requestorFax?: string;
  preferredOffice?: string;

  // Holder & Delivery
  holderName?: string;
  attentionOf?: string;
  holderAddress1?: string;
  holderAddress2?: string;
  holderCity?: string;
  holderState?: string;
  holderZip?: string;
  holderEmail?: string;
  holderPhone?: string;
  holderFax?: string;
  deliveryMethod?: string;
  coverages?: string[];
  coverageOtherText?: string;

  // Endorsements & Job
  isAdditionalInsured?: boolean;
  hasWrittenContract?: boolean;
  additionalInsuredName?: string;
  additionalInsuredAddress?: string;
  additionalInsuredLines?: string[];
  waiverSubrogationLines?: string[];
  primaryNonContributory?: boolean;
  jobNumber?: string;
  workState?: string;
  jobPayroll?: string;
  jobStartDate?: string;
  neededByDate?: string;

  // Instructions & Meta
  specialInstructions?: string;
  attachedFileName?: string;
  attachedFileSize?: number;
  agreementAccepted?: boolean;
  preferredLanguage?: string;
  source?: string;
  recaptchaScore?: number;
  submittedAt?: string;

  // Branding Customization
  logoUrl?: string;
}

export const CertificateRequestEmail: React.FC<CertificateRequestEmailProps> = ({
  confirmationCode = 'COI-CT-2026-894120',
  insuredName = 'Apex Contracting LLC',
  policyNumber = 'POL-CT-994182',
  relationship = 'I am the named insured',
  requestorName = 'Carlos Mendez',
  companyName = 'Apex Contracting LLC',
  requestorEmail = 'carlos@apexcontracting.com',
  requestorPhone = '(203) 748-9272',
  requestorFax = '',
  preferredOffice = 'Danbury',

  holderName = 'City of Danbury - Department of Public Works',
  attentionOf = 'Risk Management & Permits Bureau',
  holderAddress1 = '155 Deer Hill Ave',
  holderAddress2 = 'Suite 204',
  holderCity = 'Danbury',
  holderState = 'CT',
  holderZip = '06810',
  holderEmail = 'permits@danbury-ct.gov',
  holderPhone = '(203) 797-4500',
  holderFax = '',
  deliveryMethod = 'Email',
  coverages = ['General Liability', 'Automobile Liability', "Workers' Compensation & Employers' Liability"],
  coverageOtherText = '',

  isAdditionalInsured = true,
  hasWrittenContract = true,
  additionalInsuredName = 'City of Danbury, its officials, employees, and agents',
  additionalInsuredAddress = '155 Deer Hill Ave, Danbury, CT 06810',
  additionalInsuredLines = ['General Liability', 'Automobile Liability'],
  waiverSubrogationLines = ["Workers' Compensation & Employers' Liability", 'General Liability'],
  primaryNonContributory = true,
  jobNumber = 'BID-2026-MAIN-ST-04',
  workState = 'CT',
  jobPayroll = '$185,000',
  jobStartDate = '2026-11-01',
  neededByDate = '2026-10-15',

  specialInstructions = 'Certificate holder must be named as Additional Insured on a Primary & Non-Contributory basis with Waiver of Subrogation applicable to all operations per written contract.',
  attachedFileName = 'Job_Bid_Specifications_Exhibit_B.pdf',
  attachedFileSize = 2451000,
  agreementAccepted = true,
  preferredLanguage = 'en',
  source = 'Web_Form',
  recaptchaScore = 0.9,
  submittedAt,
  logoUrl = 'https://aia-danbury.com/images/logo.png',
}) => {
  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST'
    : new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST';

  const fullHolderAddress = [holderAddress1, holderAddress2, `${holderCity}, ${holderState} ${holderZip}`]
    .filter(Boolean)
    .join(', ');

  const isUrgent = Boolean(neededByDate);

  return (
    <Html lang="en">
      <Head>
        <title>ACORD 25 Certificate Request - {confirmationCode}</title>
      </Head>
      <Preview>
        ACORD 25 Certificate Request [{confirmationCode}] — Insured: {insuredName} | Holder: {holderName}
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          {/* Header Card */}
          <Section style={headerStyle}>
            <Row>
              <Column style={{ width: '60%', verticalAlign: 'middle' }}>
                <Img
                  src={logoUrl}
                  width="170"
                  height="auto"
                  alt="Associated Insurance Agency"
                  style={logoImageStyle}
                />
              </Column>
              <Column style={{ width: '40%', textAlign: 'right', verticalAlign: 'middle' }}>
                <Text style={badgeStyle}>ACORD 25 COI DISPATCH</Text>
                <Text style={refCodeStyle}>{confirmationCode}</Text>
              </Column>
            </Row>
            <Text style={subHeaderStyle}>
              Commercial Certificate of Insurance Request • Associated Insurance Agency (AIA)
            </Text>
          </Section>

          {/* Servicing Branch Banner */}
          <Section style={branchBannerStyle}>
            <Row>
              <Column>
                <Text style={branchBannerTitle}>
                  🏢 Servicing Branch: <strong>{preferredOffice} Office</strong>
                </Text>
                <Text style={branchBannerSubtitle}>
                  Ingested: {formattedDate} • Source: <code style={codeSnippetStyle}>{source}</code>
                  {recaptchaScore !== undefined && (
                    <span> • reCAPTCHA Score: <strong>{recaptchaScore.toFixed(2)}</strong></span>
                  )}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Urgent Rush Indicator if needed by date is present */}
          {isUrgent && (
            <Section style={urgentAlertStyle}>
              <Text style={urgentAlertText}>
                ⏱️ <strong>DEADLINE SPECIFIED:</strong> Certificate needed by <strong>{neededByDate}</strong>.
                Standard turnaround is 2–4 business hours.
              </Text>
            </Section>
          )}

          {/* Section 1: Named Insured & Requestor Details */}
          <Section style={sectionCardStyle}>
            <Heading as="h2" style={sectionHeadingStyle}>
              👤 1. Named Insured & Requestor
            </Heading>
            <table style={tableStyle}>
              <tbody>
                <tr>
                  <td style={tableLabelStyle}>Named Insured:</td>
                  <td style={tableValueStrongStyle}>{insuredName}</td>
                </tr>
                {policyNumber && (
                  <tr>
                    <td style={tableLabelStyle}>Policy Number:</td>
                    <td style={tableValueStyle}>
                      <code style={codeSnippetStyle}>{policyNumber}</code>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={tableLabelStyle}>Requestor Name:</td>
                  <td style={tableValueStyle}>{requestorName}</td>
                </tr>
                {companyName && (
                  <tr>
                    <td style={tableLabelStyle}>Requestor Company:</td>
                    <td style={tableValueStyle}>{companyName}</td>
                  </tr>
                )}
                <tr>
                  <td style={tableLabelStyle}>Relationship:</td>
                  <td style={tableValueStyle}>{relationship}</td>
                </tr>
                <tr>
                  <td style={tableLabelStyle}>Email Address:</td>
                  <td style={tableValueStyle}>
                    <Link href={`mailto:${requestorEmail}`} style={linkStyle}>
                      {requestorEmail}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={tableLabelStyle}>Phone Number:</td>
                  <td style={tableValueStyle}>
                    <Link href={`tel:${requestorPhone}`} style={linkStyle}>
                      {requestorPhone}
                    </Link>
                  </td>
                </tr>
                {requestorFax && (
                  <tr>
                    <td style={tableLabelStyle}>Fax Number:</td>
                    <td style={tableValueStyle}>{requestorFax}</td>
                  </tr>
                )}
                <tr>
                  <td style={tableLabelStyle}>Preferred Language:</td>
                  <td style={tableValueStyle}>{preferredLanguage.toUpperCase()}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Section 2: Certificate Holder & Delivery Dispatch */}
          <Section style={sectionCardStyle}>
            <Heading as="h2" style={sectionHeadingStyle}>
              🏢 2. Certificate Holder & Delivery Method
            </Heading>
            <table style={tableStyle}>
              <tbody>
                <tr>
                  <td style={tableLabelStyle}>Certificate Holder:</td>
                  <td style={tableValueStrongStyle}>{holderName}</td>
                </tr>
                {attentionOf && (
                  <tr>
                    <td style={tableLabelStyle}>Attention Of:</td>
                    <td style={tableValueStyle}>{attentionOf}</td>
                  </tr>
                )}
                <tr>
                  <td style={tableLabelStyle}>Physical Address:</td>
                  <td style={tableValueStyle}>{fullHolderAddress}</td>
                </tr>
                <tr>
                  <td style={tableLabelStyle}>Delivery Method:</td>
                  <td style={tableValueStrongStyle}>{deliveryMethod}</td>
                </tr>
                {holderEmail && (
                  <tr>
                    <td style={tableLabelStyle}>Holder Email:</td>
                    <td style={tableValueStyle}>
                      <Link href={`mailto:${holderEmail}`} style={linkStyle}>
                        {holderEmail}
                      </Link>
                    </td>
                  </tr>
                )}
                {holderPhone && (
                  <tr>
                    <td style={tableLabelStyle}>Holder Phone:</td>
                    <td style={tableValueStyle}>{holderPhone}</td>
                  </tr>
                )}
                {holderFax && (
                  <tr>
                    <td style={tableLabelStyle}>Holder Fax:</td>
                    <td style={tableValueStyle}>{holderFax}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Coverage Badges */}
            <Section style={coverageBlockStyle}>
              <Text style={subSectionTitle}>🛡️ Coverages Required to Verify:</Text>
              <div style={badgeContainerStyle}>
                {coverages.map((cov, idx) => (
                  <span key={idx} style={coverageTagStyle}>
                    ✓ {cov}
                  </span>
                ))}
              </div>
              {coverageOtherText && (
                <Text style={otherCoverageTextStyle}>
                  <strong>Additional Coverage Notes:</strong> {coverageOtherText}
                </Text>
              )}
            </Section>
          </Section>

          {/* Section 3: Endorsements & Contract Terms */}
          <Section style={sectionCardStyle}>
            <Heading as="h2" style={sectionHeadingStyle}>
              📋 3. Contractual Endorsements & Job Scope
            </Heading>
            <table style={tableStyle}>
              <tbody>
                <tr>
                  <td style={tableLabelStyle}>Additional Insured:</td>
                  <td style={isAdditionalInsured ? tagYesStyle : tagNoStyle}>
                    {isAdditionalInsured ? '✅ YES - Required' : '❌ NO'}
                  </td>
                </tr>
                <tr>
                  <td style={tableLabelStyle}>Written Contract:</td>
                  <td style={hasWrittenContract ? tagYesStyle : tagNoStyle}>
                    {hasWrittenContract ? '✅ YES - In Place' : '❌ NO'}
                  </td>
                </tr>
                <tr>
                  <td style={tableLabelStyle}>Primary & Non-Contributory:</td>
                  <td style={primaryNonContributory ? tagYesStyle : tagNoStyle}>
                    {primaryNonContributory ? '✅ YES - Required' : '❌ NO'}
                  </td>
                </tr>
                {additionalInsuredName && (
                  <tr>
                    <td style={tableLabelStyle}>Addl Insured Entity:</td>
                    <td style={tableValueStyle}>{additionalInsuredName}</td>
                  </tr>
                )}
                {additionalInsuredLines && additionalInsuredLines.length > 0 && (
                  <tr>
                    <td style={tableLabelStyle}>Addl Insured Lines:</td>
                    <td style={tableValueStyle}>{additionalInsuredLines.join(', ')}</td>
                  </tr>
                )}
                {waiverSubrogationLines && waiverSubrogationLines.length > 0 && (
                  <tr>
                    <td style={tableLabelStyle}>Waiver of Subrogation:</td>
                    <td style={tableValueStyle}>{waiverSubrogationLines.join(', ')}</td>
                  </tr>
                )}
                {jobNumber && (
                  <tr>
                    <td style={tableLabelStyle}>Job / Contract / Bid #:</td>
                    <td style={tableValueStyle}>
                      <code style={codeSnippetStyle}>{jobNumber}</code>
                    </td>
                  </tr>
                )}
                {workState && (
                  <tr>
                    <td style={tableLabelStyle}>Work State:</td>
                    <td style={tableValueStyle}>{workState}</td>
                  </tr>
                )}
                {jobStartDate && (
                  <tr>
                    <td style={tableLabelStyle}>Job Start Date:</td>
                    <td style={tableValueStyle}>{jobStartDate}</td>
                  </tr>
                )}
                {jobPayroll && (
                  <tr>
                    <td style={tableLabelStyle}>Estimated Payroll / Value:</td>
                    <td style={tableValueStyle}>{jobPayroll}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Section>

          {/* Section 4: Special Instructions & File Uploads */}
          <Section style={sectionCardStyle}>
            <Heading as="h2" style={sectionHeadingStyle}>
              📝 4. Special Instructions & Attachments
            </Heading>
            <div style={instructionsBoxStyle}>
              <Text style={instructionsTextStyle}>
                {specialInstructions || 'No special instructions or description of operations provided.'}
              </Text>
            </div>

            {attachedFileName && (
              <Section style={attachmentCardStyle}>
                <Row>
                  <Column style={{ width: '32px' }}>
                    <Text style={{ fontSize: '20px', margin: 0 }}>📎</Text>
                  </Column>
                  <Column>
                    <Text style={attachmentNameStyle}>
                      Attached Spec File: <strong>{attachedFileName}</strong>
                    </Text>
                    {attachedFileSize && (
                      <Text style={attachmentSizeStyle}>
                        Size: {(attachedFileSize / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    )}
                  </Column>
                </Row>
              </Section>
            )}

            <Text style={legalAckStyle}>
              {agreementAccepted
                ? '✅ Requestor confirmed legal agreement: understands certificate is informational unless endorsed.'
                : '⚠️ Legal agreement was not explicitly accepted.'}
            </Text>
          </Section>

          {/* Producer Quick Action Buttons */}
          <Section style={actionSectionStyle}>
            <Heading as="h3" style={actionHeadingStyle}>
              ⚡ Producer Actions
            </Heading>
            <Row>
              <Column style={{ textAlign: 'center', padding: '6px' }}>
                <Button
                  href={`mailto:${requestorEmail}?subject=Re:%20ACORD%2025%20Certificate%20Request%20(${confirmationCode})`}
                  style={primaryButtonStyle}
                >
                  ✉️ Reply to Requestor
                </Button>
              </Column>
              <Column style={{ textAlign: 'center', padding: '6px' }}>
                <Button href={`tel:${requestorPhone}`} style={secondaryButtonStyle}>
                  📞 Call Requestor
                </Button>
              </Column>
              {holderEmail && (
                <Column style={{ textAlign: 'center', padding: '6px' }}>
                  <Button
                    href={`mailto:${holderEmail}?subject=Certificate%20of%20Insurance%20-%20${encodeURIComponent(insuredName)}%20(${confirmationCode})`}
                    style={darkButtonStyle}
                  >
                    📤 Send to Holder
                  </Button>
                </Column>
              )}
            </Row>
          </Section>

          {/* Footer */}
          <Hr style={dividerStyle} />
          <Section style={footerStyle}>
            <Text style={footerHeading}>Associated Insurance Agency (AIA)</Text>
            <Text style={footerAddress}>
              <strong>Danbury HQ:</strong> 50 Newtown Road, Suite 1, Danbury, CT 06810 • (203) 748-9272<br />
              <strong>Watertown Branch:</strong> 51 Depot St Ste 112, Watertown, CT 06795 • (860) 274-8888<br />
              <strong>Bridgeport Branch:</strong> 2465 Main Street, Bridgeport, CT 06606 • (203) 333-8880
            </Text>
            <Text style={footerDisclaimer}>
              Licensed in CT, NY, NJ, MA • Independent Agency representing 11+ premier insurance carriers.<br />
              This email is an internal operational dispatch generated by the AIA Web Platform. ACORD is a registered trademark of ACORD.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default CertificateRequestEmail;

// Inline Styles for Cross-Client Email Compatibility
const mainStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: '0',
  padding: '24px 0',
  color: '#09090b',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '640px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #e4e4e7',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#122b5f',
  padding: '28px 32px 20px 32px',
  borderBottom: '3px solid #bda07a',
  color: '#ffffff',
};

const logoImageStyle: React.CSSProperties = {
  display: 'block',
  maxWidth: '170px',
  height: 'auto',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  margin: '0',
  padding: '4px 8px',
  backgroundColor: '#1e3a7a',
  color: '#bda07a',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: '700',
  letterSpacing: '1px',
  textTransform: 'uppercase',
};

const refCodeStyle: React.CSSProperties = {
  margin: '4px 0 0 0',
  color: '#ffffff',
  fontFamily: 'monospace',
  fontSize: '13px',
  fontWeight: '700',
};

const subHeaderStyle: React.CSSProperties = {
  margin: '12px 0 0 0',
  color: '#cbd5e1',
  fontSize: '12px',
  letterSpacing: '0.2px',
};

const branchBannerStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
  padding: '12px 32px',
};

const branchBannerTitle: React.CSSProperties = {
  margin: '0',
  color: '#122b5f',
  fontSize: '13px',
  fontWeight: '500',
};

const branchBannerSubtitle: React.CSSProperties = {
  margin: '2px 0 0 0',
  color: '#64748b',
  fontSize: '12px',
};

const urgentAlertStyle: React.CSSProperties = {
  backgroundColor: '#fffbeb',
  borderLeft: '4px solid #f59e0b',
  margin: '16px 32px 0 32px',
  padding: '10px 14px',
  borderRadius: '4px',
};

const urgentAlertText: React.CSSProperties = {
  margin: '0',
  color: '#92400e',
  fontSize: '13px',
  lineHeight: '1.4',
};

const sectionCardStyle: React.CSSProperties = {
  padding: '20px 32px',
  borderBottom: '1px solid #f1f5f9',
};

const sectionHeadingStyle: React.CSSProperties = {
  margin: '0 0 14px 0',
  fontSize: '15px',
  fontWeight: '700',
  color: '#122b5f',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '6px',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

const tableLabelStyle: React.CSSProperties = {
  padding: '6px 0',
  width: '38%',
  color: '#64748b',
  fontSize: '13px',
  fontWeight: '500',
  verticalAlign: 'top',
};

const tableValueStyle: React.CSSProperties = {
  padding: '6px 0',
  width: '62%',
  color: '#09090b',
  fontSize: '13px',
  verticalAlign: 'top',
};

const tableValueStrongStyle: React.CSSProperties = {
  ...tableValueStyle,
  fontWeight: '700',
  color: '#0f172a',
};

const linkStyle: React.CSSProperties = {
  color: '#122b5f',
  textDecoration: 'underline',
  fontWeight: '600',
};

const codeSnippetStyle: React.CSSProperties = {
  backgroundColor: '#f1f5f9',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '12px',
  fontFamily: 'monospace',
  color: '#334155',
};

const coverageBlockStyle: React.CSSProperties = {
  marginTop: '12px',
  padding: '12px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const subSectionTitle: React.CSSProperties = {
  margin: '0 0 8px 0',
  fontSize: '12px',
  fontWeight: '700',
  color: '#475569',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const badgeContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
};

const coverageTagStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#e0f2fe',
  color: '#0369a1',
  padding: '3px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: '600',
  marginRight: '6px',
  marginBottom: '6px',
};

const otherCoverageTextStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  fontSize: '12px',
  color: '#334155',
};

const tagYesStyle: React.CSSProperties = {
  ...tableValueStyle,
  color: '#15803d',
  fontWeight: '700',
};

const tagNoStyle: React.CSSProperties = {
  ...tableValueStyle,
  color: '#64748b',
};

const instructionsBoxStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderLeft: '3px solid #bda07a',
  padding: '12px 16px',
  borderRadius: '0 6px 6px 0',
};

const instructionsTextStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '13px',
  lineHeight: '1.5',
  color: '#334155',
};

const attachmentCardStyle: React.CSSProperties = {
  marginTop: '12px',
  backgroundColor: '#f1f5f9',
  padding: '10px 14px',
  borderRadius: '6px',
};

const attachmentNameStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '13px',
  color: '#1e293b',
};

const attachmentSizeStyle: React.CSSProperties = {
  margin: '2px 0 0 0',
  fontSize: '11px',
  color: '#64748b',
};

const legalAckStyle: React.CSSProperties = {
  marginTop: '12px',
  fontSize: '12px',
  color: '#64748b',
  fontStyle: 'italic',
};

const actionSectionStyle: React.CSSProperties = {
  padding: '24px 32px',
  backgroundColor: '#f8fafc',
  textAlign: 'center',
};

const actionHeadingStyle: React.CSSProperties = {
  margin: '0 0 14px 0',
  fontSize: '13px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#64748b',
  fontWeight: '700',
};

const primaryButtonStyle: React.CSSProperties = {
  backgroundColor: '#122b5f',
  color: '#ffffff',
  padding: '10px 18px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block',
};

const secondaryButtonStyle: React.CSSProperties = {
  backgroundColor: '#bda07a',
  color: '#122b5f',
  padding: '10px 18px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: '700',
  textDecoration: 'none',
  display: 'inline-block',
};

const darkButtonStyle: React.CSSProperties = {
  backgroundColor: '#334155',
  color: '#ffffff',
  padding: '10px 18px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block',
};

const dividerStyle: React.CSSProperties = {
  borderColor: '#e4e4e7',
  margin: '0',
};

const footerStyle: React.CSSProperties = {
  padding: '24px 32px',
  backgroundColor: '#ffffff',
  textAlign: 'center',
};

const footerHeading: React.CSSProperties = {
  margin: '0',
  fontSize: '13px',
  fontWeight: '700',
  color: '#122b5f',
};

const footerAddress: React.CSSProperties = {
  margin: '8px 0 0 0',
  fontSize: '11px',
  color: '#64748b',
  lineHeight: '1.6',
};

const footerDisclaimer: React.CSSProperties = {
  margin: '12px 0 0 0',
  fontSize: '10px',
  color: '#94a3b8',
  lineHeight: '1.5',
};
