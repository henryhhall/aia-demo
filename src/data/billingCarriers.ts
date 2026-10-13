export interface BillingCarrier {
  name: string;
  phone: string;
  phoneRaw: string;
  url: string;
  isLogin?: boolean;
}

export const PERSONAL_BILLING_CARRIERS: BillingCarrier[] = [
  {
    name: 'Travelers',
    phone: '(877) 307-4202',
    phoneRaw: '8773074202',
    url: 'https://personal.travelers.com/paybill/#/findAccount?flow=otp',
  },
  {
    name: 'Progressive',
    phone: '(800) 776-4737',
    phoneRaw: '8007764737',
    url: 'https://account.apps.progressive.com/access/ez-payment/policy-info',
  },
  {
    name: 'National General',
    phone: '(877) 468-3466',
    phoneRaw: '8774683466',
    url: 'https://eservice.nationalgeneral.com/service/quick-pay',
  },
  {
    name: 'Utica National',
    phone: '(800) 598-8422',
    phoneRaw: '8005988422',
    url: 'https://www.uticanational.com/make-a-payment',
  },
  {
    name: 'Liberty Mutual',
    phone: '(800) 332-3226',
    phoneRaw: '8003323226',
    url: 'https://eservice.libertymutual.com/account/billing/pwol/?anim=none',
  },
  {
    name: 'Foremost',
    phone: '(800) 527-3907',
    phoneRaw: '8005273907',
    url: 'https://www.myforemostaccount.com/fmcss/payment/findpolicy',
  },
  {
    name: 'The Hartford',
    phone: '(800) 423-6789',
    phoneRaw: '8004236789',
    url: 'https://service.thehartford.com/service/expresspay/landing',
  },
  {
    name: 'Plymouth Rock',
    phone: '(844) 242-3555',
    phoneRaw: '8442423555',
    url: 'https://ci2.plymouthrock.com/qpay/login',
  },
  {
    name: 'Geico',
    phone: '(800) 207-7847',
    phoneRaw: '8002077847',
    url: 'https://www.geico.com/information/make-a-payment/',
  },
  {
    name: 'CT Fair Plan',
    phone: '(860) 528-9546',
    phoneRaw: '8605289546',
    url: 'https://ctfairplan.epaypolicy.com/',
  },
];

export const COMMERCIAL_BILLING_CARRIERS: BillingCarrier[] = [
  {
    name: 'Progressive',
    phone: '(800) 444-4487',
    phoneRaw: '8004444487',
    url: 'https://account.apps.progressive.com/access/ez-payment/policy-info',
  },
  {
    name: 'Geico',
    phone: '(866) 509-9444',
    phoneRaw: '8665099444',
    url: 'https://ecams.geico.com/login',
    isLogin: true,
  },
  {
    name: 'National General',
    phone: '(877) 468-3466',
    phoneRaw: '8774683466',
    url: 'https://eservice.nationalgeneral.com/service/quick-pay',
  },
  {
    name: 'Travelers',
    phone: '(800) 238-6225',
    phoneRaw: '8002386225',
    url: 'https://epay-cl.travelers.com/epay/ExpressPayInput.aspx?AppCN=EPAYPDEMC',
  },
  {
    name: 'Utica First',
    phone: '(800) 456-4556',
    phoneRaw: '8004564556',
    url: 'https://www.uticafirst.com/pay-my-bill/',
  },
  {
    name: 'Kemper',
    phone: '(866) 860-9348',
    phoneRaw: '8668609348',
    url: 'https://www.kemper.com/my-policy/make-a-payment',
  },
  {
    name: 'The Hartford',
    phone: '(866) 467-8730',
    phoneRaw: '8664678730',
    url: 'https://business.thehartford.com/agent-expresspay',
  },
  {
    name: 'Guard',
    phone: '(800) 673-2465',
    phoneRaw: '8006732465',
    url: 'https://policyholder.guard.com/payment',
  },
  {
    name: 'Main Street America',
    phone: '(877) 927-5672',
    phoneRaw: '8779275672',
    url: 'https://msainsurance.com/pay-my-bill',
  },
  {
    name: 'Tokio Marine',
    phone: '(888) 313-4434',
    phoneRaw: '8883134434',
    url: 'https://onlinebillpay.tokiomarine.us/',
    isLogin: true,
  },
];
