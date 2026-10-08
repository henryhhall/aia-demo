interface RecaptchaLegalNoticeProps {
  lang?: 'en' | 'es' | 'pt' | 'tr';
  className?: string;
}

export default function RecaptchaLegalNotice({
  lang = 'en',
  className = '',
}: RecaptchaLegalNoticeProps) {
  const privacyUrl = 'https://policies.google.com/privacy';
  const termsUrl = 'https://policies.google.com/terms';

  return (
    <p
      className={`text-[11px] text-text-muted leading-relaxed text-center sm:text-left ${className}`}
      data-testid="recaptcha-legal-notice"
    >
      {lang === 'es' ? (
        <>
          Este sitio está protegido por reCAPTCHA y se aplican la{' '}
          <a
            href={privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Política de Privacidad
          </a>{' '}
          y los{' '}
          <a
            href={termsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Términos de Servicio
          </a>{' '}
          de Google.
        </>
      ) : lang === 'pt' ? (
        <>
          Este site é protegido pelo reCAPTCHA e aplicam-se a{' '}
          <a
            href={privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Política de Privacidade
          </a>{' '}
          e os{' '}
          <a
            href={termsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Termos de Serviço
          </a>{' '}
          do Google.
        </>
      ) : lang === 'tr' ? (
        <>
          Bu site reCAPTCHA ile korunmaktadır; Google{' '}
          <a
            href={privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Gizlilik Politikası
          </a>{' '}
          ve{' '}
          <a
            href={termsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Hizmet Şartları
          </a>{' '}
          geçerlidir.
        </>
      ) : (
        <>
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href={privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href={termsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Terms of Service
          </a>{' '}
          apply.
        </>
      )}
    </p>
  );
}
