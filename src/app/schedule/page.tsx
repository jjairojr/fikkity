"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Calendar,
  User,
  MapPin,
  Check,
  AlertCircle,
  ArrowLeft,
  Palette,
} from "lucide-react";

import { FloatingParticles } from "@/components/ui/floating-particles";
import { bookingSchema, type BookingFormData } from "@/validations/booking";
import { createBooking } from "@/lib/supabase";

const tattooStyles = [
  "Blackwork",
  "Fine Line",
  "Oriental",
  "Cyber Tribal",
  "Body Suit",
  "Outro",
];

const bodyParts = [
  "Braço",
  "Antebraço",
  "Mão",
  "Peito",
  "Costela",
  "Costas",
  "Glúteos",
  "Perna",
  "Coxa",
  "Panturrilha",
  "Pé",
  "Pescoço",
  "Outro",
];

const sizes = [
  "Pequena (até 5cm)",
  "Média (5-15cm)",
  "Grande (15-25cm)",
  "Extra Grande (25cm+)",
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const locations = [
  {
    value: "goiania",
    label: "Goiânia - Liv Art Studio",
    address: "Setor Pedro Ludovico",
  },
  { value: "curitiba", label: "Curitiba - Liv Art Studio", address: "Mercês" },
  {
    value: "saopaulo",
    label: "São Paulo - Liv Art Studio",
    address: "Brooklin",
  },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [referenceImages, setReferenceImages] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const totalSteps = 4;

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      style: "",
      bodyPart: "",
      size: "",
      description: "",
      budget: "",
      preferredDate: "",
      preferredTime: "",
      location: "goiania",
      isFirstTattoo: false,
      hasAllergies: false,
      allergiesDescription: "",
      referenceImages: [],
    },
  });

  const hasAllergies = watch("hasAllergies");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const validateCurrentStep = async () => {
    let fields: (keyof BookingFormData)[] = [];

    switch (currentStep) {
      case 1:
        fields = ["name", "email", "phone", "age"];
        break;
      case 2:
        fields = ["style", "bodyPart", "size", "description"];
        break;
      case 3:
        fields = ["preferredDate", "preferredTime", "location"];

        break;
      default:
        return true;
    }

    return await trigger(fields);
  };

  const nextStep = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    const isStepValid = await validateCurrentStep();
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 3 - referenceImages.length);
    const updatedImages = [...referenceImages, ...newFiles].slice(0, 3);

    setReferenceImages(updatedImages);
    setValue("referenceImages", updatedImages);
  };

  const removeImage = (index: number) => {
    const updatedImages = referenceImages.filter((_, i) => i !== index);
    setReferenceImages(updatedImages);
    setValue("referenceImages", updatedImages);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      await createBooking(data);

      await fetch("/api/send-booking-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erro ao enviar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormField = ({
    children,
    error,
    label,
    required = false,
  }: {
    children: React.ReactNode;
    error?: string;
    label: string;
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-mono tracking-[2px] text-gray-400 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500 font-mono flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-8">
        <FloatingParticles />
        <div className="text-center max-w-md mx-auto relative z-10">
          <div className="w-20 h-20 mx-auto mb-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-mono tracking-[4px] mb-4 text-white">
            AGENDAMENTO ENVIADO
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Seu agendamento foi recebido com sucesso! Entraremos em contato em
            até 24 horas para confirmar os detalhes.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 border border-red-500 text-red-500 hover:bg-red-500/10 transition-all duration-300 font-mono tracking-[2px] text-sm"
          >
            <ArrowLeft size={16} />
            VOLTAR AO INÍCIO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative z-10 min-h-screen py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors mb-8 font-mono text-sm tracking-[2px]"
            >
              <ArrowLeft size={16} />
              VOLTAR
            </Link>

            <h1 className="text-4xl font-thin tracking-[8px] font-mono mb-4 text-white">
              AGENDAMENTO
            </h1>
            <div className="w-20 h-px bg-red-500 mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Preencha os dados abaixo para agendar sua sessão de tatuagem.
              Todas as informações são importantes para criarmos a arte perfeita
              para você.
            </p>
          </div>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-mono text-sm transition-all duration-300 ${
                    i + 1 <= currentStep
                      ? "border-red-500 bg-red-500/20 text-red-500"
                      : "border-gray-700 text-gray-500"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
              <span>DADOS PESSOAIS</span>
              <span>TATUAGEM</span>
              <span>AGENDAMENTO</span>
              <span>REVISÃO</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 p-8 rounded-lg">
              {/* Step 1: Dados Pessoais */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <User className="text-red-500" size={24} />
                    <h2 className="text-2xl font-mono tracking-[4px] text-white">
                      DADOS PESSOAIS
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="NOME COMPLETO"
                      required
                      error={errors.name?.message}
                    >
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 font-mono text-sm"
                            placeholder="Seu nome completo"
                          />
                        )}
                      />
                    </FormField>

                    <FormField
                      label="IDADE"
                      required
                      error={errors.age?.message}
                    >
                      <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            min="18"
                            max="100"
                            className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 font-mono text-sm"
                            placeholder="18"
                          />
                        )}
                      />
                    </FormField>

                    <FormField
                      label="EMAIL"
                      required
                      error={errors.email?.message}
                    >
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="email"
                            className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 font-mono text-sm"
                            placeholder="seu@email.com"
                          />
                        )}
                      />
                    </FormField>

                    <FormField
                      label="TELEFONE"
                      required
                      error={errors.phone?.message}
                    >
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="tel"
                            className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 font-mono text-sm"
                            placeholder="(11) 99999-9999"
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                "",
                              );
                              const formatted = value
                                .replace(/(\d{2})(\d)/, "($1) $2")
                                .replace(/(\d{5})(\d)/, "$1-$2")
                                .slice(0, 15);
                              field.onChange(formatted);
                            }}
                          />
                        )}
                      />
                    </FormField>
                  </div>

                  <div className="space-y-4">
                    <Controller
                      name="isFirstTattoo"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="w-4 h-4 bg-black border border-gray-700 rounded focus:ring-red-500 focus:ring-2"
                          />
                          <span className="text-sm text-gray-400 font-mono">
                            Esta será minha primeira tatuagem
                          </span>
                        </label>
                      )}
                    />

                    <Controller
                      name="hasAllergies"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="w-4 h-4 bg-black border border-gray-700 rounded focus:ring-red-500 focus:ring-2"
                          />
                          <span className="text-sm text-gray-400 font-mono">
                            Tenho alergias ou condições médicas
                          </span>
                        </label>
                      )}
                    />

                    {hasAllergies && (
                      <FormField
                        label="DESCRIÇÃO DAS ALERGIAS"
                        error={errors.allergiesDescription?.message}
                      >
                        <Controller
                          name="allergiesDescription"
                          control={control}
                          render={({ field }) => (
                            <textarea
                              {...field}
                              className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 font-mono text-sm h-24 resize-none"
                              placeholder="Descreva suas alergias ou condições médicas..."
                            />
                          )}
                        />
                      </FormField>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Dados da Tatuagem */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <Palette className="text-red-500" size={24} />
                    <h2 className="text-2xl font-mono tracking-[4px] text-white">
                      SUA TATUAGEM
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="ESTILO"
                      required
                      error={errors.style?.message}
                    >
                      <Controller
                        name="style"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white transition-all duration-300 font-mono text-sm"
                          >
                            <option value="">Selecione o estilo</option>
                            {tattooStyles.map((style) => (
                              <option key={style} value={style}>
                                {style}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                    </FormField>

                    <FormField
                      label="LOCAL DO CORPO"
                      required
                      error={errors.bodyPart?.message}
                    >
                      <Controller
                        name="bodyPart"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white transition-all duration-300 font-mono text-sm"
                          >
                            <option value="">Selecione o local</option>
                            {bodyParts.map((part) => (
                              <option key={part} value={part}>
                                {part}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                    </FormField>

                    <FormField
                      label="TAMANHO"
                      required
                      error={errors.size?.message}
                    >
                      <Controller
                        name="size"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white transition-all duration-300 font-mono text-sm"
                          >
                            <option value="">Selecione o tamanho</option>
                            {sizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                    </FormField>

                    <FormField
                      label="ORÇAMENTO ESTIMADO"
                      error={errors.budget?.message}
                    >
                      <Controller
                        name="budget"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white transition-all duration-300 font-mono text-sm"
                          >
                            <option value="">Selecione a faixa</option>
                            <option value="200-500">R$ 200 - R$ 500</option>
                            <option value="500-1000">R$ 500 - R$ 1.000</option>
                            <option value="1000-2000">
                              R$ 1.000 - R$ 2.000
                            </option>
                            <option value="2000+">R$ 2.000+</option>
                          </select>
                        )}
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="DESCRIÇÃO DA IDEIA"
                    required
                    error={errors.description?.message}
                  >
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 font-mono text-sm h-32 resize-none"
                          placeholder="Descreva o que imagina para sua tattoo. Referências, significados, história, inspirações, elementos..."
                        />
                      )}
                    />
                  </FormField>

                  {/* <div> */}
                  {/*   <label className="block text-sm font-mono tracking-[2px] text-gray-400 mb-4"> */}
                  {/*     IMAGENS DE REFERÊNCIA (Opcional) */}
                  {/*   </label> */}
                  {/**/}
                  {/*   <div */}
                  {/*     className={`border-2 border-dashed transition-all duration-300 p-8 text-center ${ */}
                  {/*       dragActive */}
                  {/*         ? "border-red-500 bg-red-500/10" */}
                  {/*         : "border-gray-700 hover:border-gray-600" */}
                  {/*     }`} */}
                  {/*     onDragEnter={handleDrag} */}
                  {/*     onDragLeave={handleDrag} */}
                  {/*     onDragOver={handleDrag} */}
                  {/*     onDrop={handleDrop} */}
                  {/*   > */}
                  {/*     <Upload */}
                  {/*       className="mx-auto mb-4 text-gray-500" */}
                  {/*       size={32} */}
                  {/*     /> */}
                  {/*     <p className="text-gray-400 font-mono text-sm mb-2"> */}
                  {/*       Arraste imagens aqui ou clique para selecionar */}
                  {/*     </p> */}
                  {/*     <p className="text-gray-600 text-xs"> */}
                  {/*       Máximo 3 imagens • PNG, JPG até 5MB cada */}
                  {/*     </p> */}
                  {/*     <input */}
                  {/*       ref={fileInputRef} */}
                  {/*       type="file" */}
                  {/*       multiple */}
                  {/*       accept="image/*" */}
                  {/*       onChange={(e) => handleFileUpload(e.target.files)} */}
                  {/*       className="hidden" */}
                  {/*     /> */}
                  {/*     <button */}
                  {/*       type="button" */}
                  {/*       onClick={() => fileInputRef.current?.click()} */}
                  {/*       className="mt-4 px-6 py-2 border border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300 font-mono text-sm" */}
                  {/*     > */}
                  {/*       SELECIONAR ARQUIVOS */}
                  {/*     </button> */}
                  {/*   </div> */}

                  {/*   {referenceImages.length > 0 && ( */}
                  {/*     <div className="grid grid-cols-3 gap-4 mt-4"> */}
                  {/*       {referenceImages.map((file, index) => ( */}
                  {/*         <div key={index} className="relative group"> */}
                  {/*           <img */}
                  {/*             src={URL.createObjectURL(file)} */}
                  {/*             alt={`Referência ${index + 1}`} */}
                  {/*             className="w-full h-24 object-cover border border-gray-700 rounded" */}
                  {/*           /> */}
                  {/*           <button */}
                  {/*             type="button" */}
                  {/*             onClick={() => removeImage(index)} */}
                  {/*             className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity" */}
                  {/*           > */}
                  {/*             <X size={12} /> */}
                  {/*           </button> */}
                  {/*         </div> */}
                  {/*       ))} */}
                  {/*     </div> */}
                  {/*   )} */}
                  {/* </div> */}
                </div>
              )}

              {/* Step 3: Agendamento */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <Calendar className="text-red-500" size={24} />
                    <h2 className="text-2xl font-mono tracking-[4px] text-white">
                      AGENDAMENTO
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="DATA PREFERIDA"
                      required
                      error={errors.preferredDate?.message}
                    >
                      <Controller
                        name="preferredDate"
                        control={control}
                        render={({ field }) => {
                          const today = new Date();
                          const maxYear = today.getFullYear() + 2;

                          return (
                            <div className="relative">
                              <input
                                type="date"
                                {...field}
                                min={today.toISOString().split("T")[0]}
                                max={`${maxYear}-12-31`}
                                onKeyDown={(e) => e.preventDefault()}
                                onPaste={(e) => e.preventDefault()}
                                onClick={(e) => {
                                  (e.target as HTMLInputElement).showPicker?.();
                                }}
                                className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white transition-all duration-300 font-mono text-sm cursor-pointer"
                              />
                            </div>
                          );
                        }}
                      />
                    </FormField>

                    <FormField
                      label="HORÁRIO PREFERIDO"
                      required
                      error={errors.preferredTime?.message}
                    >
                      <Controller
                        name="preferredTime"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full bg-black/50 border border-gray-700 focus:border-red-500 px-4 py-3 text-white transition-all duration-300 font-mono text-sm"
                          >
                            <option value="">Selecione o horário</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="LOCAL"
                    required
                    error={errors.location?.message}
                  >
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-3">
                          {locations.map((location) => (
                            <label
                              key={location.value}
                              className={`flex items-center p-4 border transition-all duration-300 cursor-pointer ${
                                field.value === location.value
                                  ? "border-red-500 bg-red-500/10"
                                  : "border-gray-700 hover:border-gray-600"
                              }`}
                            >
                              <input
                                type="radio"
                                {...field}
                                value={location.value}
                                checked={field.value === location.value}
                                className="sr-only"
                              />
                              <MapPin className="mr-3 text-red-500" size={20} />
                              <div>
                                <div className="font-mono text-sm text-white">
                                  {location.label}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {location.address}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    />
                  </FormField>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded">
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="text-yellow-500 mt-0.5"
                        size={20}
                      />
                      <div>
                        <h4 className="font-mono text-sm text-yellow-500 mb-1">
                          IMPORTANTE
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          O agendamento será confirmado após análise da
                          disponibilidade. Entraremos em contato em até 24 horas
                          para confirmar data e horário.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Revisão */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <Check className="text-red-500" size={24} />
                    <h2 className="text-2xl font-mono tracking-[4px] text-white">
                      REVISÃO DOS DADOS
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-mono text-red-500 tracking-[2px] text-sm">
                        DADOS PESSOAIS
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-400">Nome:</span>{" "}
                          <span className="text-white">{watch("name")}</span>
                        </p>
                        <p>
                          <span className="text-gray-400">Email:</span>{" "}
                          <span className="text-white">{watch("email")}</span>
                        </p>
                        <p>
                          <span className="text-gray-400">Telefone:</span>{" "}
                          <span className="text-white">{watch("phone")}</span>
                        </p>
                        <p>
                          <span className="text-gray-400">Idade:</span>{" "}
                          <span className="text-white">
                            {watch("age")} anos
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-mono text-red-500 tracking-[2px] text-sm">
                        TATUAGEM
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-400">Estilo:</span>{" "}
                          <span className="text-white">{watch("style")}</span>
                        </p>
                        <p>
                          <span className="text-gray-400">Local:</span>{" "}
                          <span className="text-white">
                            {watch("bodyPart")}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-400">Tamanho:</span>{" "}
                          <span className="text-white">{watch("size")}</span>
                        </p>
                        {watch("budget") && (
                          <p>
                            <span className="text-gray-400">Orçamento:</span>{" "}
                            <span className="text-white">
                              R$ {watch("budget")}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-mono text-red-500 tracking-[2px] text-sm">
                        AGENDAMENTO
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-400">Data:</span>{" "}
                          <span className="text-white">
                            {watch("preferredDate") &&
                              new Date(
                                watch("preferredDate"),
                              ).toLocaleDateString("pt-BR")}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-400">Horário:</span>{" "}
                          <span className="text-white">
                            {watch("preferredTime")}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-400">Local:</span>{" "}
                          <span className="text-white">
                            {
                              locations.find(
                                (loc) => loc.value === watch("location"),
                              )?.label
                            }
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-mono text-red-500 tracking-[2px] text-sm">
                        DESCRIÇÃO
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed wrap-break-word">
                        {watch("description")}
                      </p>
                      {referenceImages.length > 0 && (
                        <p className="text-sm text-gray-400">
                          {referenceImages.length} imagem(ns) de referência
                          anexada(s)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 font-mono text-sm tracking-[2px] transition-all duration-300 ${
                  currentStep === 1
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600"
                }`}
              >
                <ArrowLeft size={16} />
                ANTERIOR
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-mono text-sm tracking-[2px] transition-all duration-300"
                >
                  PRÓXIMO
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-800 disabled:text-gray-600 text-white font-mono text-sm tracking-[2px] transition-all duration-300 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ENVIANDO...
                    </>
                  ) : (
                    "ENVIAR AGENDAMENTO"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
