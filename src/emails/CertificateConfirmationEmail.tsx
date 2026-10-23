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

export interface CertificateConfirmationEmailProps {
  confirmationCode?: string;
  requestorName?: string;
  insuredName?: string;
  holderName?: string;
  deliveryMethod?: string;
  coverages?: string[];
  neededByDate?: string;
  preferredOffice?: string;
  officePhone?: string;
  officeEmail?: string;
  officeAddress?: string;
  submittedAt?: string;
  logoUrl?: string;
  preferredLanguage?: string;
}

export const CertificateConfirmationEmail: React.FC<CertificateConfirmationEmailProps> = ({
  confirmationCode = 'COI-CT-2026-894120',
  requestorName = 'Carlos Mendez',
  insuredName = 'Apex Contracting LLC',
  holderName = 'City of Danbury - Department of Public Works',
  deliveryMethod = 'Email',
  coverages = ['General Liability', 'Automobile Liability', "Workers' Compensation & Employers' Liability"],
  neededByDate = '2026-10-15',
  preferredOffice = 'Danbury Corporate HQ',
  officePhone = '(203) 748-9272',
  officeEmail = 'danbury@aia-danbury.com',
  officeAddress = '50 Newtown Road, Suite 1, Danbury, CT 06810',
  submittedAt,
  logoUrl = 'cid:aia-logo',
  preferredLanguage = 'en',
}) => {
  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST'
    : new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST';

  return (
    <Html lang="en">
      <Head>
        <title>{`Certificate of Insurance Request Received - ${confirmationCode}`}</title>
      </Head>
      <Preview>
        Certificate of Insurance Request Confirmed [{confirmationCode}] — Insured: {insuredName}
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          {/* Executive Brand Header Bar */}
          <Section style={brandBarStyle}>
            <Row>
              <Column style={{ width: '60%', verticalAlign: 'middle' }}>
                <Img
                  src={logoUrl}
                  width="135"
                  height="auto"
                  alt="Associated Insurance Agency"
                  style={logoImageStyle}
                />
              </Column>
              <Column style={{ width: '40%', textAlign: 'right', verticalAlign: 'middle' }}>
                <Text style={brandBadgeStyle}>REQUEST CONFIRMED</Text>
                <Text style={refCodeDarkStyle}>{confirmationCode}</Text>
              </Column>
            </Row>
          </Section>

          {/* Welcome & Intro */}
          <Section style={contentSectionStyle}>
            <Text style={eyebrowStyle}>Official ACORD 25 Certificate Confirmation</Text>
            <Heading as="h1" style={greetingHeading}>
              Hello {requestorName},
            </Heading>
            <Text style={paragraphStyle}>
              Thank you for submitting your official <strong>ACORD 25 Certificate of Insurance (COI)</strong> request.
              Our commercial lines service team has received your submission and is preparing the certificate.
            </Text>

            {/* Tracking Reference Card */}
            <Section style={summaryBoxStyle}>
              <Text style={summaryBadgeStyle}>TRACKING REFERENCE</Text>
              <Text style={summaryCodeStyle}>{confirmationCode}</Text>
              <Text style={summarySubtextStyle}>Submitted on {formattedDate}</Text>
            </Section>

            {/* Summary Details */}
            <Heading as="h2" style={sectionHeadingStyle}>
              📋 Request Summary
            </Heading>
            <table style={tableStyle}>
              <tbody>
                <tr>
                  <td style={tableLabelStyle}>Named Insured:</td>
                  <td style={tableValueStrongStyle}>{insuredName}</td>
                </tr>
                <tr>
                  <td style={tableLabelStyle}>Certificate Holder:</td>
                  <td style={tableValueStrongStyle}>{holderName}</td>
                </tr>
                <tr>
                  <td style={tableLabelStyle}>Delivery Method:</td>
                  <td style={tableValueStyle}>{deliveryMethod}</td>
                </tr>
                {neededByDate && (
                  <tr>
                    <td style={tableLabelStyle}>Required By:</td>
                    <td style={tableValueStyle}>
                      <strong style={{ color: '#b45309' }}>{neededByDate}</strong>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={tableLabelStyle}>Assigned Office:</td>
                  <td style={tableValueStyle}>
                    {preferredOffice} (<Link href={`tel:${officePhone}`} style={linkStyle}>{officePhone}</Link>)
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Coverage List */}
            {coverages && coverages.length > 0 && (
              <Section style={{ marginTop: '16px' }}>
                <Text style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
                  Coverage Lines Certified:
                </Text>
                <div>
                  {coverages.map((cov, idx) => (
                    <span key={idx} style={coverageTagStyle}>
                      ✓ {cov}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Turnaround & Rush Callout */}
            <Section style={slaCalloutStyle}>
              <Heading as="h3" style={slaHeadingStyle}>
                ⏱️ Standard Turnaround: 2–4 Business Hours
              </Heading>
              <Text style={slaTextStyle}>
                Requests received during business hours (Monday – Friday, 8:30 AM – 5:00 PM EST) are processed promptly.
                Once verified, the certificate will be dispatched via {deliveryMethod.toLowerCase()} directly to the certificate holder
                with a copy sent to your email.
              </Text>
              <Text style={rushTextStyle}>
                🚨 <strong>Job Site Emergency or Immediate Permit Deadline?</strong><br />
                Call our Danbury Headquarters directly at <Link href="tel:203-748-9272" style={urgentLinkStyle}>(203) 748-9272</Link> for rush expediting.
              </Text>
            </Section>

            {/* Questions Button */}
            <Section style={{ textAlign: 'center', marginTop: '24px' }}>
              <Button href={`tel:${officePhone}`} style={callButtonStyle}>
                📞 Contact Branch Office ({officePhone})
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={dividerStyle} />
          <Section style={footerStyle}>
            <Text style={footerHeading}>Associated Insurance Agency (AIA)</Text>
            <Text style={footerOfficeInfo}>
              {preferredOffice} • {officeAddress} • {officePhone}
            </Text>
            <Text style={disclaimerStyle}>
              <strong>Statutory ACORD 25 Notice:</strong> This certificate is issued as a matter of information only and confers no rights upon the certificate holder. This certificate does not affirmatively or negatively amend, extend, or alter the coverage afforded by the policies listed.
            </Text>
            <Text style={copyrightStyle}>
              © {new Date().getFullYear()} Associated Insurance Agency LLC. All rights reserved. • CT License #002377312 • {LICENSED_IN_I18N[(preferredLanguage || 'en').toLowerCase()] || LICENSED_IN_I18N.en}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default CertificateConfirmationEmail;

const LICENSED_IN_I18N: Record<string, string> = {
  en: 'Licensed in CT',
  es: 'Licencia en CT',
  pt: 'Licenciada em CT',
  tr: 'CT Lisanslı',
};

const mainStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: '0',
  padding: '24px 0',
  color: '#09090b',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #e4e4e7',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
};

const brandBarStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '24px 32px',
  borderBottom: '2px solid #c5a880',
};

const brandBadgeStyle: React.CSSProperties = {
  display: 'inline-block',
  margin: '0',
  padding: '4px 8px',
  backgroundColor: '#0f172a',
  color: '#c5a880',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: '700',
  letterSpacing: '1px',
  textTransform: 'uppercase',
};

const refCodeDarkStyle: React.CSSProperties = {
  margin: '4px 0 0 0',
  color: '#0f172a',
  fontFamily: 'monospace',
  fontSize: '13px',
  fontWeight: '700',
};

const eyebrowStyle: React.CSSProperties = {
  margin: '0 0 8px 0',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '1.5px',
  color: '#b45309',
  textTransform: 'uppercase',
};

const logoImageStyle: React.CSSProperties = {
  display: 'block',
  width: '135px',
  maxWidth: '135px',
  height: 'auto',
  border: '0',
};

const contentSectionStyle: React.CSSProperties = {
  padding: '28px 32px',
};

const greetingHeading: React.CSSProperties = {
  margin: '0 0 12px 0',
  fontSize: '18px',
  fontWeight: '700',
  color: '#09090b',
};

const paragraphStyle: React.CSSProperties = {
  margin: '0 0 20px 0',
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#334155',
};

const summaryBoxStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '16px 20px',
  marginBottom: '24px',
  textAlign: 'center',
};

const summaryBadgeStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontWeight: '700',
  color: '#64748b',
};

const summaryCodeStyle: React.CSSProperties = {
  margin: '4px 0',
  fontSize: '22px',
  fontWeight: '700',
  fontFamily: 'monospace',
  color: '#122b5f',
  letterSpacing: '0.5px',
};

const summarySubtextStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '12px',
  color: '#64748b',
};

const sectionHeadingStyle: React.CSSProperties = {
  margin: '0 0 12px 0',
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
};

const tableValueStyle: React.CSSProperties = {
  padding: '6px 0',
  width: '62%',
  color: '#09090b',
  fontSize: '13px',
};

const tableValueStrongStyle: React.CSSProperties = {
  ...tableValueStyle,
  fontWeight: '700',
};

const linkStyle: React.CSSProperties = {
  color: '#122b5f',
  textDecoration: 'none',
  fontWeight: '600',
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

const slaCalloutStyle: React.CSSProperties = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '8px',
  padding: '16px 20px',
  marginTop: '24px',
};

const slaHeadingStyle: React.CSSProperties = {
  margin: '0 0 6px 0',
  fontSize: '14px',
  fontWeight: '700',
  color: '#166534',
};

const slaTextStyle: React.CSSProperties = {
  margin: '0 0 10px 0',
  fontSize: '13px',
  lineHeight: '1.5',
  color: '#15803d',
};

const rushTextStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '12px',
  lineHeight: '1.5',
  color: '#166534',
  borderTop: '1px solid #bbf7d0',
  paddingTop: '8px',
};

const urgentLinkStyle: React.CSSProperties = {
  color: '#166534',
  fontWeight: '700',
  textDecoration: 'underline',
};

const callButtonStyle: React.CSSProperties = {
  backgroundColor: '#122b5f',
  color: '#ffffff',
  padding: '10px 20px',
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
  backgroundColor: '#f8fafc',
  textAlign: 'center',
};

const footerHeading: React.CSSProperties = {
  margin: '0',
  fontSize: '13px',
  fontWeight: '700',
  color: '#122b5f',
};

const footerOfficeInfo: React.CSSProperties = {
  margin: '4px 0 0 0',
  fontSize: '11px',
  color: '#64748b',
};

const disclaimerStyle: React.CSSProperties = {
  margin: '12px 0 0 0',
  fontSize: '10px',
  color: '#94a3b8',
  lineHeight: '1.4',
};

const copyrightStyle: React.CSSProperties = {
  margin: '8px 0 0 0',
  fontSize: '10px',
  color: '#cbd5e1',
};
