/**
 * This file has been claimed for ownership from @oussemasahbeni/keycloakify-login-shadcn version 250004.0.15.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/i18n.ts" --revert
 */

import { i18nBuilder } from "@keycloakify/login-ui/i18n";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { I18nProvider, useI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            welcomeTitle: "Clube Pormade",
            welcomeMessage:
                "Access your exclusive space and track experiences, benefits, and your progress in the Club.",
            loginAccountTitle: "Login to your account",
            registerTitle: "Register a new account",
            email: "Email",
            enterCredentials: "Enter your credentials below to login",
            noAccount: "Don't have an account?",
            doRegister: "Sign up",
            "organization.selectTitle": "Choose Your Organization",
            "organization.pickPlaceholder": "Pick an organization to continue"
        },
        ar: {
            welcomeTitle: "نادي بورمادي",
            welcomeMessage:
                "ادخل إلى مساحتك الحصرية وتابع التجارب والمزايا وتقدمك في النادي.",
            loginAccountTitle: "تسجيل الدخول  إلى حسابك",
            registerTitle: "تسجيل حساب جديد",
            email: "البريد الإلكتروني",
            enterCredentials: "أدخل بيانات الاعتماد الخاصة بك أدناه لتسجيل الدخول",
            doRegister: "إنشاء حساب",
            noAccount: "ليس لديك حساب؟",
            "organization.selectTitle": "اختر مؤسستك",
            "organization.pickPlaceholder": "اختر مؤسسة للمتابعة"
        },
        fr: {
            welcomeTitle: "Clube Pormade",
            welcomeMessage:
                "Accédez à votre espace exclusif et suivez les expériences, les avantages et votre progression au Club.",
            loginAccountTitle: "Connectez-vous à votre compte",
            registerTitle: "Créer    un nouveau compte",
            email: "E-mail",
            enterCredentials:
                "Entrez vos informations d'identification ci-dessous pour vous connecter",
            doRegister: "S'inscrire",
            noAccount: "Vous n'avez pas de compte?",
            "organization.selectTitle": "Choisissez Votre Organisation",
            "organization.pickPlaceholder": "Sélectionnez une organisation pour continuer"
        },
        "pt-BR": {
            welcomeTitle: "Clube Pormade",
            welcomeMessage:
                "Acesse o seu espaço exclusivo e acompanhe experiências, benefícios e o seu progresso no Clube.",
            loginAccountTitle: "Acesse sua conta",
            registerTitle: "Crie uma nova conta",
            email: "E-mail",
            enterCredentials: "Informe seus dados abaixo para entrar",
            noAccount: "Não tem uma conta?",
            doRegister: "Cadastre-se",
            "organization.selectTitle": "Escolha sua organização",
            "organization.pickPlaceholder": "Selecione uma organização para continuar"
        }
    })
    .build();

export { I18nProvider, useI18n };
