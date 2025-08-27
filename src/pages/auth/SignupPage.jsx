import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Zap, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';

const SignupPage = () => {
  const { session, signUp, loading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: 'Campos incompletos',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive',
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Senhas não conferem',
        description: 'As senhas digitadas não são iguais.',
        variant: 'destructive',
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: 'Senha muito curta',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    await signUp(email, password, fullName);
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
        staggerChildren: 0.07,
        delayChildren: 0.15
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
            <UserPlus className="h-16 w-16 mb-4 text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-400" />
            <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-sky-400">
              Criar Conta - 5D Therapists
            </h1>
            <p className="text-muted-foreground text-sm mt-2 text-center">
              Junte-se à nossa comunidade e transforme sua prática.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants} className="space-y-1.5">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-300">Nome Completo</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Seu nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-slate-700/50 border-slate-600 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-700/50 border-slate-600 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Crie uma senha forte (mín. 6 caracteres)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 h-full text-slate-400 hover:text-pink-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 h-full text-slate-400 hover:text-pink-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 focus:ring-purple-400"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-slate-700 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-semibold text-purple-400 hover:text-purple-300 hover:underline transition-colors inline-flex items-center">
                 <LogIn className="h-4 w-4 mr-1" /> Fazer Login
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

export default SignupPage;