import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Zap, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';

const LoginPage = () => {
  const { session, signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (session) {
      navigate('/', { replace: true });
    }
  }, [session, navigate]);

  if (session) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Campos incompletos',
        description: 'Por favor, preencha seu e-mail e senha.',
        variant: 'destructive',
      });
      return;
    }
    await signIn(email, password);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  return (
    <>
      <div className="auth-page-background" />
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md quantum-card p-8 md:p-10"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
            <Zap className="h-16 w-16 mb-4 text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-500" />
            <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              Login - 5D Therapists
            </h1>
            <p className="text-muted-foreground text-sm mt-2 text-center">
              Acesse sua conta para continuar sua jornada quântica.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-700/50 border-slate-600 placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 h-full text-slate-400 hover:text-purple-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-105 focus:ring-pink-400"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <Link
              to="/forgot-password" 
              className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
            >
              Esqueceu sua senha?
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4 pt-4 border-t border-slate-700 text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link to="/signup" className="font-semibold text-pink-500 hover:text-pink-400 hover:underline transition-colors inline-flex items-center">
                <UserPlus className="h-4 w-4 mr-1" /> Cadastre-se
              </Link>
            </p>
          </motion.div>
        </motion.div>
        
        <motion.p 
          initial={{opacity: 0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{delay: 0.8}}
          className="mt-8 text-xs text-center text-slate-500"
        >
          © {new Date().getFullYear()} 5D Therapists. Todos os direitos reservados.
        </motion.p>
      </div>
    </>
  );
};

export default LoginPage;