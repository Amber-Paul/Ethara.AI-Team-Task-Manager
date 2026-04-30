import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ROLE_CONFIG = {
  admin: {
    label: 'Admin',
    icon: '⚡',
    tagline: 'Manage projects & teams',
    accent: '#7c6ff7',
    accentSoft: 'rgba(124,111,247,0.12)',
    accentBorder: 'rgba(124,111,247,0.35)',
    gradient: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
    demoEmail: 'alex@taskflow.demo',
    demoPassword: 'demo123',
    desc: 'Full access — create projects, invite members, manage tasks and settings.',
  },
  member: {
    label: 'Member',
    icon: '◉',
    tagline: 'Work on assigned tasks',
    accent: '#10b981',
    accentSoft: 'rgba(16,185,129,0.12)',
    accentBorder: 'rgba(16,185,129,0.35)',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    demoEmail: 'sarah@taskflow.demo',
    demoPassword: 'demo123',
    desc: 'Collaborate on projects you\'ve been invited to and manage your tasks.',
  },
};

export default function AuthPage() {
  const [role, setRole] = useState(null);       // null | 'admin' | 'member'
  const [mode, setMode] = useState('login');     // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const cfg = role ? ROLE_CONFIG[role] : null;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleRoleSelect = (r) => {
    setRole(r);
    setError('');
    setForm({ name: '', email: '', password: '' });
  };

  const handleBack = () => {
    setRole(null);
    setError('');
    setMode('login');
  };

  const fillDemo = () => {
    setForm(f => ({ ...f, email: cfg.demoEmail, password: cfg.demoPassword }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
        toast(`Welcome back!`);
      } else {
        await signup(form.name, form.email, form.password);
        toast('Account created!');
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Animated background blobs */}
      <div style={{
        position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: cfg
            ? `radial-gradient(circle, ${cfg.accentSoft} 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(124,111,247,0.07) 0%, transparent 70%)',
          top: -150, left: -150,
          transition: 'background 0.5s ease',
        }} />
        <div style={{
          position: 'absolute', width: 380, height: 380, borderRadius: '50%',
          background: cfg
            ? `radial-gradient(circle, ${cfg.accentSoft} 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)',
          bottom: -100, right: -100,
          transition: 'background 0.5s ease',
        }} />
      </div>

      <div className="auth-card" style={{ position: 'relative', zIndex: 1, maxWidth: role ? 420 : 480 }}>

        {/* Logo */}
        <div className="auth-logo" style={{ marginBottom: role ? 20 : 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 20,
              background: cfg ? cfg.gradient : 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
              transition: 'background 0.4s ease',
              boxShadow: cfg ? `0 4px 16px ${cfg.accentSoft}` : 'none',
            }}>⚡</div>
<span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>ETHARA.AI</span>
          </div>
        </div>

        {/* ── ROLE SELECTOR ── */}
        {!role && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
                How are you joining?
              </div>
              <div style={{ color: 'var(--text3)', fontSize: 13 }}>
                Choose your role to get started
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Object.entries(ROLE_CONFIG).map(([key, c]) => (
                <button
                  key={key}
                  onClick={() => handleRoleSelect(key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '18px 20px',
                    background: 'var(--bg2)',
                    border: `1px solid var(--border2)`,
                    borderRadius: 12,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = c.accentBorder;
                    e.currentTarget.style.background = c.accentSoft;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border2)';
                    e.currentTarget.style.background = 'var(--bg2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: c.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                    boxShadow: `0 4px 12px ${c.accentSoft}`,
                  }}>
                    {c.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16,
                      color: 'var(--text)', marginBottom: 3,
                    }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.4 }}>
                      {c.desc}
                    </div>
                  </div>
                  <div style={{ color: 'var(--text3)', fontSize: 18 }}>›</div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── LOGIN / SIGNUP FORM ── */}
        {role && (
          <>
            {/* Role badge + back */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <button
                onClick={handleBack}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text3)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: 13,
                  padding: '4px 0',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
              >
                ‹ Back
              </button>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '5px 12px',
                background: cfg.accentSoft,
                border: `1px solid ${cfg.accentBorder}`,
                borderRadius: 20,
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: cfg.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12,
                }}>
                  {cfg.icon}
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: cfg.accent }}>
                  {cfg.label} Access
                </span>
              </div>
            </div>

            {/* Heading */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </div>
              <div style={{ color: 'var(--text3)', fontSize: 13 }}>
                {mode === 'login' ? `Sign in as ${cfg.label.toLowerCase()}` : cfg.tagline}
              </div>
            </div>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={submit}>
              {mode === 'signup' && (
                <div className="form-group">
                  <label className="label">Full Name</label>
                  <input className="input" type="text" placeholder="Your full name"
                    value={form.name} onChange={e => set('name', e.target.value)} required autoFocus />
                </div>
              )}
              <div className="form-group">
                <label className="label">Email</label>
                <input className="input" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => set('email', e.target.value)} required
                  autoFocus={mode === 'login'} />
              </div>
              <div className="form-group">
                <label className="label">Password</label>
                <input className="input" type="password"
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                  value={form.password} onChange={e => set('password', e.target.value)} required />
              </div>

              <button
                type="submit"
                className="btn w-full mt-3"
                style={{
                  justifyContent: 'center', height: 42,
                  background: cfg.gradient,
                  color: 'white', border: 'none', borderRadius: 8,
                  fontWeight: 700, fontSize: 14,
                  boxShadow: `0 4px 16px ${cfg.accentSoft}`,
                  transition: 'opacity 0.15s, transform 0.15s',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
                disabled={loading}
              >
                {loading ? 'Please wait…' : mode === 'login' ? `Sign in as ${cfg.label}` : 'Create Account'}
              </button>
            </form>

            {/* Demo credentials shortcut */}
            {mode === 'login' && (
              <div style={{
                marginTop: 14, padding: '10px 14px',
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    Demo credentials
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'monospace' }}>
                    {cfg.demoEmail}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fillDemo}
                  style={{
                    fontSize: 12, fontWeight: 600, color: cfg.accent,
                    background: cfg.accentSoft, border: `1px solid ${cfg.accentBorder}`,
                    borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
                  }}
                >
                  Use demo
                </button>
              </div>
            )}

            <div className="auth-toggle" style={{ marginTop: 16 }}>
              {mode === 'login' ? (
                <>Don't have an account?{' '}
                  <a onClick={() => { setMode('signup'); setError(''); }}>Sign up</a>
                </>
              ) : (
                <>Already have an account?{' '}
                  <a onClick={() => { setMode('login'); setError(''); }}>Sign in</a>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
