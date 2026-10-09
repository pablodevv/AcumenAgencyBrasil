import { FormEvent, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Globe2,
  Lightbulb,
  LineChart,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Megaphone,
  Minus,
  MoveRight,
  Plus,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react';

const LOGO_URL = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop/AQEpElOrlJH3278k/trs-copy-A85VZNLjBzF053Qp.png';
const HERO_VIDEO = 'https://videos.pexels.com/video-files/3191887/3191887-uhd_3840_2160_25fps.mp4';
const TORONTO_IMAGE = 'https://images.pexels.com/photos/4490701/pexels-photo-4490701.jpeg?auto=compress&cs=tinysrgb&w=1920';
const APPROACH_IMAGE = 'https://images.pexels.com/photos/34823908/pexels-photo-34823908.jpeg?auto=compress&cs=tinysrgb&w=1920';

const services = [
  { icon: Target, number: '01', title: 'Estratégia & Gestão', text: 'Decisões mais claras, operações mais inteligentes e crescimento desenhado para durar.' },
  { icon: Megaphone, number: '02', title: 'Marketing & Marca', text: 'Campanhas globais e posicionamento que transformam atenção em valor percebido.' },
  { icon: BarChart3, number: '03', title: 'Finanças & Corporativo', text: 'Suporte financeiro e corporativo com precisão, discrição e visão de longo prazo.' },
  { icon: LineChart, number: '04', title: 'Operações & Outsourcing', text: 'Especialistas sob demanda para acelerar times, projetos e novas frentes de negócio.' },
];

const approachSteps = [
  { icon: Search, number: '01', title: 'Diagnóstico', text: 'Imersão profunda no seu contexto, mercado e desafios. Entendemos antes de propor.' },
  { icon: Lightbulb, number: '02', title: 'Estratégia', text: 'Um plano sob medida, com prioridades claras, métricas definidas e timing realista.' },
  { icon: Rocket, number: '03', title: 'Execução', text: 'O time certo entra em campo. Especialistas alinhados à sua visão, atuando como extensão do seu negócio.' },
  { icon: LineChart, number: '04', title: 'Resultado', text: 'Monitoramos, ajustamos e comprovamos impacto. Cada entrega medida contra suas metas reais.' },
];

const portfolio = [
  { name: 'Aleksanteri', tag: 'Luxury Brand', services: 'Consulting · Brand Package · Product Designs', text: 'Elevamos o posicionamento da marca de luxo Aleksanteri, refinando sua identidade para ressoar com sua clientela exigente, e colaboramos em designs de produtos com elegância e inovação únicas.' },
  { name: 'Fumpa Pumps', tag: 'Cycling Technology', services: 'International Market Expansion', text: 'Suporte completo na expansão internacional da pioneira em tecnologia cycling: registros corporativos, estratégias tributárias, e streamline de import/export para entrega global dos seus produtos.' },
  { name: 'Guardian Holdings', tag: 'Multinacional', services: 'Corporate Marketing · Ongoing Support', text: 'Fortalecimento contínuo da presença corporativa de um conglomerado multinacional: branding, marketing digital, gestão de reputação e consultoria estratégica de forma continuada.' },
  { name: 'Standard Jewelry Co.', tag: 'E-Commerce', services: 'E-Commerce Growth Strategies', text: 'Expansão do e-commerce com plataformas otimizadas, integração com marketplaces major e insights de marketing estratégico, conectando a marca a audiências globais.' },
  { name: 'Capsule Seed Corp.', tag: 'Agriculture', services: 'Marketing Strategy · Digital · SEO', text: 'Estratégia de marketing sob medida que levou a Capsule Seeds aos primeiros 13.000 vendas — um marco significativo no seu crescimento acelerado.' },
  { name: 'Princess Cleaning', tag: 'M&A Advisory', services: 'M&A Services · Brand Positioning', text: 'Assessoria completa de M&A que posicionou a empresa para aquisição. Guiamos cada etapa do processo, garantindo uma transição lucrativa e seamless.' },
  { name: 'Acxelsus', tag: 'BPO / Remote Staffing', services: 'International Market Expansion', text: 'Fortalecimento da estratégia de expansão internacional da BPO Acxelsus, com business development, guidance de licensing e frameworks de compliance cross-border.' },
  { name: 'HumanNeed.org', tag: 'NGO', services: 'Growth Strategy Consulting', text: 'Consultoria de crescimento para uma NGO dedicada a impacto social: iniciativas estratégicas, otimização de operações e caminho claro para ampliar seu alcance.' },
];

const faqs = [
  { q: 'Como vocês garantem confidencialidade?', a: 'Trabalhamos com NDAs estruturados, times dedicados e processos internos de compliance. Confidencialidade não é um diferencial — é o padrão. Todo o manuseio de dados e comunicações é protegido por controles de acesso e auditorias de rotina.' },
  { q: 'Onde vocês estão baseados?', a: 'Somos baseados em Toronto, Canadá, com atuação absolutamente global. Nossa rede descentralizada combina inteligência local e padrões globais em múltiplas jurisdições, do Brasil à Europa, da África à Ásia.' },
  { q: 'Qual é o porte mínimo de projeto?', a: 'Atuamos desde startups em estágio inicial até multinacionais e governos. O que define a parceria não é o tamanho, mas a ambição do projeto.' },
  { q: 'Vocês atuam em quais mercados?', a: 'Temos presença e parceiros em múltiplas jurisdições. Operamos globalmente a partir de Toronto, com inteligência local em cada mercado que tocamos.' },
  { q: 'Como funciona o modelo de remuneração?', a: 'Flexível. Podemos trabalhar por projeto, retainer mensal ou modelo híbrido. A estrutura é definida após o diagnóstico inicial, conforme a necessidade real.' },
];

const audiences = ['Governos', 'Multinacionais', 'Empresas em crescimento', 'Startups & fundadores', 'Famílias & clientes privados', 'NGOs & organizações'];

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function FAQItem({ item, isOpen, onToggle }: { item: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{item.q}</span>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <div className="faq-answer">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const message = String(formData.get('message') || '');

    setSubmitState('sending');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitState('success');
      form.reset();
    } catch {
      setSubmitState('error');
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
    <main className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Acumen Agency início">
          <img src={LOGO_URL} alt="Acumen Agency" className="brand-logo" />
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#sobre" onClick={closeMenu}>A Acumen</a>
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#metodo" onClick={closeMenu}>Método</a>
          <a href="#portfolio" onClick={closeMenu}>Portfólio</a>
          <a href="#presenca" onClick={closeMenu}>Presença</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a className="nav-cta" href="#contato" onClick={closeMenu}>Solicitar proposta <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="hero" id="inicio">
        {!videoLoaded && <div className="hero-placeholder" />}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(true)}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <Reveal>
            <p className="eyebrow">ACUMEN AGENCY™ <span /> TORONTO · CANADÁ · MUNDO</p>
            <h1>O próximo nível<br /><i>do seu negócio.</i></h1>
            <p className="hero-copy">Uma agência. Toda a capacidade que sua visão exige.<br className="desktop-break" /> Estratégia, execução e inteligência para transformar ambição em impacto.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#contato">Fale com um especialista <ArrowRight size={17} /></a>
              <a className="text-link light-link" href="#portfolio">Veja nosso portfólio <ArrowDown size={16} /></a>
            </div>
          </Reveal>
        </div>
        <div className="hero-note"><span>SCROLL PARA EXPLORAR</span><span className="note-line" /></div>
        <div className="hero-stamp"><Sparkles size={16} /> Precisão. Discrição. Resultado.</div>
      </section>

      <section className="trust-bar">
        <div className="trust-bar-inner">
          <div className="trust-bar-item"><strong>Toronto</strong><span>Base</span></div>
          <div className="trust-bar-divider" />
          <div className="trust-bar-item"><strong>800k+</strong><span>Profissionais</span></div>
          <div className="trust-bar-divider" />
          <div className="trust-bar-item"><strong>1</strong><span>Ponto de contato</span></div>
          <div className="trust-bar-divider" />
          <div className="trust-bar-item"><strong>∞</strong><span>Possibilidades</span></div>
        </div>
      </section>

      <section className="statement section-pad" id="sobre">
        <Reveal>
          <div className="section-kicker"><span>01</span><span className="rule" /><span>UM PARCEIRO PARA GRANDES MOVIMENTOS</span></div>
        </Reveal>
        <div className="statement-grid">
          <Reveal>
            <h2>Ideias grandiosas<br /><i>precisam de estrutura.</i></h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="statement-detail">
              <p className="lead">A Acumen Agency é uma empresa global de serviços profissionais feita para quem não aceita soluções comuns.</p>
              <p>Baseados em Toronto, Canadá, com atuação absolutamente global, reunimos estratégia, marketing, finanças, operações e expertise setorial sob uma única visão. Assim, sua empresa avança com mais clareza, velocidade e consistência — sem o peso de múltiplos fornecedores, sem perda de foco, sem ruído.</p>
              <a className="text-link dark-link" href="#contato">Conheça a Acumen <MoveRight size={18} /></a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div className="metrics">
            <div><strong>Toronto</strong><span>base no Canadá</span></div>
            <div><strong>∞</strong><span>possibilidades</span></div>
            <div><strong>800k+</strong><span>profissionais sob demanda</span></div>
            <div><strong>Global</strong><span>por natureza</span></div>
          </div>
        </Reveal>
      </section>

      <section className="services section-pad" id="servicos">
        <Reveal>
          <div className="section-kicker light-kicker"><span>02</span><span className="rule" /><span>CAPACIDADE QUE SE MOVE COM VOCÊ</span></div>
        </Reveal>
        <div className="services-heading">
          <Reveal><h2>Expertise sem<br /><i>compartimentos.</i></h2></Reveal>
          <Reveal delay={150}><p>Do primeiro diagnóstico à última entrega, colocamos o time certo ao lado do desafio certo.</p></Reveal>
        </div>
        <div className="service-list">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={i * 100}>
              <a className="service-card" href="#contato">
                <span className="service-icon"><service.icon size={28} /></span>
                <span className="service-number">{service.number}</span>
                <div><h3>{service.title}</h3><p>{service.text}</p></div>
                <ArrowUpRight className="service-arrow" size={22} />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="service-foot"><span>Também atuamos em design, tecnologia, brokerage e setores complexos.</span><a className="text-link light-link" href="#contato">Ver todas as soluções <ArrowRight size={17} /></a></div>
        </Reveal>
      </section>

      <section className="approach section-pad" id="metodo">
        <Reveal>
          <div className="section-kicker"><span>03</span><span className="rule" /><span>COMO TRABALHAMOS</span></div>
        </Reveal>
        <div className="approach-heading">
          <Reveal><h2>Um método.<br /><i>Resultados comprovados.</i></h2></Reveal>
        </div>
        <div className="approach-grid">
          <div className="approach-visual">
            <Reveal>
              <img src={APPROACH_IMAGE} alt="Sala de reunião executiva moderna" />
            </Reveal>
          </div>
          <div className="approach-steps">
            {approachSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 120}>
                <div className="approach-step">
                  <span className="approach-icon"><step.icon size={24} /></span>
                  <div>
                    <span className="approach-step-number">{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio section-pad" id="portfolio">
        <Reveal>
          <div className="section-kicker light-kicker"><span>04</span><span className="rule" /><span>CASOS REAIS · CLIENTES REAIS</span></div>
        </Reveal>
        <div className="portfolio-heading">
          <Reveal><h2>Portfólio que<br /><i>fala por si.</i></h2></Reveal>
          <Reveal delay={150}><p>Cada projeto é uma prova de capacidade. De marcas de luxo a ONGs, de startups a conglomerados multinacionais — resultados que construímos ao lado de quem confia na Acumen.</p></Reveal>
        </div>
        <div className="portfolio-grid">
          {portfolio.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 120}>
              <div className="portfolio-card">
                <div className="portfolio-card-header">
                  <span className="portfolio-card-name">{item.name}™</span>
                  <span className="portfolio-card-tag">{item.tag}</span>
                </div>
                <p className="portfolio-card-text">{item.text}</p>
                <div className="portfolio-card-services"><Check size={13} /> {item.services}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="portfolio-foot">
            <span>E muito mais. Cada relacionamento é único — o próximo caso pode ser o seu.</span>
            <a className="text-link dark-link" href="#contato">Solicitar proposta <ArrowRight size={17} /></a>
          </div>
        </Reveal>
      </section>

      <section className="global-section" id="presenca">
        <div className="global-image-wrap">
          <Reveal>
            <img src={TORONTO_IMAGE} alt="Vista aérea de Toronto, Canadá" />
            <div className="image-caption">TORONTO · CANADÁ<br /><span>BASE / OPERAÇÃO GLOBAL</span></div>
          </Reveal>
        </div>
        <div className="global-copy">
          <Reveal>
            <div className="section-kicker"><span>05</span><span className="rule" /><span>UMA VISÃO SEM FRONTEIRAS</span></div>
            <h2>Local insight.<br /><i>Global standard.</i></h2>
            <p>Baseados em Toronto, Canadá, operamos entre mercados, culturas e setores com a fluidez de quem entende o todo. Nossa rede descentralizada combina inteligência local, padrões globais e parceiros de confiança em múltiplas jurisdições.</p>
            <div className="audience-list">{audiences.map((audience) => <span key={audience}><Check size={15} />{audience}</span>)}</div>
            <div className="location-badge"><MapPin size={16} /> Toronto, Canadá — Presença global</div>
            <a className="button button-outline" href="#contato">Levar minha visão mais longe <ArrowUpRight size={17} /></a>
          </Reveal>
        </div>
      </section>

      <section className="trust section-pad">
        <Reveal>
          <div className="trust-mark"><ShieldCheck size={29} /><span>CONFIDENCIALIDADE<br /><b>COMO PADRÃO</b></span></div>
          <blockquote>"Não entregamos apenas serviços.<br /><i>Construímos vantagem."</i></blockquote>
          <p>Atuamos com rigor, integridade e discrição em cada relacionamento. O manuseio de dados e comunicações é protegido por controles de acesso e auditorias de rotina. Porque as melhores decisões precisam de espaço para acontecer.</p>
        </Reveal>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="faq-inner">
          <Reveal>
            <div className="section-kicker"><span>06</span><span className="rule" /><span>DÚVIDAS FREQUENTES</span></div>
            <h2>Tudo o que você<br /><i>precisa saber.</i></h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <FAQItem key={i} item={faq} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="contact section-pad" id="contato">
        <Reveal>
          <div className="section-kicker"><span>07</span><span className="rule" /><span>O PRÓXIMO MOVIMENTO É SEU</span></div>
        </Reveal>
        <div className="contact-grid">
          <Reveal>
            <div>
              <h2>Vamos conversar<br /><i>sobre o seu próximo nível.</i></h2>
              <p>Conte um pouco sobre o seu desafio. Nossa equipe retorna com o caminho mais inteligente para avançar.</p>
              <a className="email-link" href="mailto:info@acumenagency.com"><Mail size={16} /> info@acumenagency.com <ArrowUpRight size={18} /></a>
              <div className="contact-trust">
                <span><ShieldCheck size={16} /> Confidencialidade garantida</span>
                <span><Globe2 size={16} /> Resposta em 24h</span>
                <span><MapPin size={16} /> Toronto, Canadá — atendimento global</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <form onSubmit={handleSubmit}>
              {submitState === 'success' ? (
                <div className="success-message">
                  <Check size={30} />
                  <h3>Recebemos sua mensagem.</h3>
                  <p>Em breve, um especialista da Acumen entrará em contato.</p>
                </div>
              ) : (
                <>
                  <label>Seu nome<input required name="name" type="text" placeholder="Como podemos chamar você?" /></label>
                  <label>E-mail corporativo<input required name="email" type="email" placeholder="seu@email.com" /></label>
                  <label>Como podemos ajudar? <textarea required name="message" placeholder="Conte sobre o seu projeto ou desafio..." rows={3} /></label>
                  {submitState === 'error' && (
                    <p style={{ color: '#a8442a', fontSize: 13, margin: 0 }}>Algo deu errado. Tente novamente ou envie diretamente para info@acumenagency.com</p>
                  )}
                  <button className="button button-gold" type="submit" disabled={submitState === 'sending'}>
                    {submitState === 'sending' ? (<><Loader2 size={17} className="spin" /> Enviando...</>) : (<>Enviar mensagem <ArrowRight size={17} /></>)}
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand-area">
            <a className="brand footer-brand" href="#inicio">
              <img src={LOGO_URL} alt="Acumen Agency" className="brand-logo" />
            </a>
            <p className="footer-tagline">Full-Spectrum Professional Services™</p>
          </div>
          <div className="footer-links">
            <a href="#sobre">A Acumen</a>
            <a href="#servicos">Serviços</a>
            <a href="#metodo">Método</a>
            <a href="#portfolio">Portfólio</a>
            <a href="#presenca">Presença</a>
            <a href="#faq">FAQ</a>
            <a href="#contato">Contato</a>
          </div>
          <div className="footer-location">
            <span className="footer-location-label"><MapPin size={15} /> Toronto, Canadá</span>
            <span className="footer-social"><Globe2 size={15} /> Atendimento global</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Acumen Agency Corporation™ 2026</span>
          <span>Operamos com estritos padrões de confidencialidade e discrição.</span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
    </main>
      <Analytics />
    </>
  );
}

export default App;
