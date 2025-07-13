import { bookingSchema } from "@/validations/booking";
import z from "zod";

export const createBookingEmailTemplate = (
  bookingData: z.infer<typeof bookingSchema>,
) => {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Novo Agendamento</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'JetBrains Mono', monospace;
          line-height: 1.6;
          color: #ffffff;
          background-color: #000000;
          font-size: 14px;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #000000;
          border: 1px solid #1f2937;
        }
        
        .header {
          background: linear-gradient(135deg, #000000 0%, #111111 100%);
          padding: 40px 30px;
          text-align: center;
          border-bottom: 1px solid #dc2626;
          position: relative;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, #dc2626 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #dc2626 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.03;
          pointer-events: none;
        }
        
        .header h1 {
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 8px;
          margin-bottom: 8px;
          color: #ffffff;
          position: relative;
          z-index: 1;
        }
        
        .header .subtitle {
          font-size: 12px;
          color: #6b7280;
          letter-spacing: 2px;
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }
        
        .header .accent-line {
          width: 60px;
          height: 1px;
          background: #dc2626;
          margin: 20px auto 0;
        }
        
        .content {
          padding: 0;
        }
        
        .section {
          border-bottom: 1px solid #1f2937;
          padding: 30px;
          background: #000000;
        }
        
        .section:last-child {
          border-bottom: none;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid #374151;
        }
        
        .section-icon {
          width: 20px;
          height: 20px;
          background: #dc2626;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        
        .section-title {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #dc2626;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .info-item {
          background: #111111;
          border: 1px solid #1f2937;
          padding: 16px;
          border-radius: 4px;
        }
        
        .info-label {
          font-size: 10px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
          font-weight: 400;
        }
        
        .info-value {
          font-size: 14px;
          color: #ffffff;
          font-weight: 400;
          line-height: 1.4;
        }
        
        .description-section {
          background: #111111;
          border: 1px solid #1f2937;
          padding: 20px;
          border-radius: 4px;
          margin-top: 20px;
        }
        
        .description-text {
          font-size: 13px;
          color: #d1d5db;
          line-height: 1.6;
          font-style: italic;
        }
        
        .highlight-section {
          background: #0f0f0f;
          border-left: 3px solid #dc2626;
        }
        
        .medical-alert {
          background: #1a0a0a;
          border-left: 3px solid #ef4444;
        }
        
        .badge {
          display: inline-block;
          background: #dc2626;
          color: #ffffff;
          padding: 4px 12px;
          border-radius: 2px;
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 12px;
        }
        
        .footer {
          background: #111111;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #dc2626;
        }
        
        .footer-title {
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 4px;
          color: #dc2626;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        
        .footer-steps {
          margin-bottom: 24px;
        }
        
        .footer-step {
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }
        
        .footer-contact {
          padding-top: 20px;
          border-top: 1px solid #374151;
        }
        
        .footer-contact h4 {
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 12px;
          letter-spacing: 2px;
          font-weight: 500;
        }
        
        .footer-contact p {
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 4px;
          letter-spacing: 1px;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #dc2626, transparent);
          margin: 30px 0;
        }
        
        @media (max-width: 600px) {
          .container {
            margin: 0;
            border: none;
          }
          
          .header, .section, .footer {
            padding: 20px;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          
          .header h1 {
            font-size: 20px;
            letter-spacing: 4px;
          }
          
          .section-title {
            font-size: 12px;
            letter-spacing: 2px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>AGENDAMENTO</h1>
          <p class="subtitle">Nova solicitação recebida</p>
          <div class="accent-line"></div>
        </div>
        
        <!-- Content -->
        <div class="content">
          <!-- Dados Pessoais -->
          <div class="section">
            <div class="section-header">
              <div class="section-icon">👤</div>
              <div class="section-title">Cliente</div>
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Nome</div>
                <div class="info-value">${bookingData.name}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Idade</div>
                <div class="info-value">${bookingData.age} anos</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${bookingData.email}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Telefone</div>
                <div class="info-value">${bookingData.phone}</div>
              </div>
            </div>
            
            ${bookingData.isFirstTattoo ? '<div class="badge">Primeira Tatuagem</div>' : ""}
          </div>
          
          <!-- Tatuagem -->
          <div class="section">
            <div class="section-header">
              <div class="section-icon">🎨</div>
              <div class="section-title">Projeto</div>
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Estilo</div>
                <div class="info-value">${bookingData.style}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Local</div>
                <div class="info-value">${bookingData.bodyPart}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Tamanho</div>
                <div class="info-value">${bookingData.size}</div>
              </div>
              ${
                bookingData.budget
                  ? `
              <div class="info-item">
                <div class="info-label">Orçamento</div>
                <div class="info-value">R$ ${bookingData.budget}</div>
              </div>
              `
                  : ""
              }
            </div>
            
            <div class="description-section">
              <div class="info-label">Descrição</div>
              <div class="description-text">"${bookingData.description}"</div>
            </div>
          </div>
          
          <!-- Agendamento -->
          <div class="section highlight-section">
            <div class="section-header">
              <div class="section-icon">📅</div>
              <div class="section-title">Agendamento</div>
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Data</div>
                <div class="info-value">${bookingData.preferredDate}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Horário</div>
                <div class="info-value">${bookingData.preferredTime}</div>
              </div>
            </div>
            
            <div class="info-item" style="margin-top: 16px;">
              <div class="info-label">Local</div>
              <div class="info-value">${bookingData.location}</div>
            </div>
          </div>
          
          ${
            bookingData.hasAllergies
              ? `
          <!-- Informações Médicas -->
          <div class="section medical-alert">
            <div class="section-header">
              <div class="section-icon">⚠️</div>
              <div class="section-title">Atenção Médica</div>
            </div>
            
            <div class="description-section">
              <div class="info-label">Alergias / Condições</div>
              <div class="description-text">${bookingData.allergiesDescription}</div>
            </div>
          </div>
          `
              : ""
          }
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-title">Próximos Passos</div>
          
          <div class="footer-steps">
            <div class="footer-step">→ Agendamento registrado no sistema</div>
            <div class="footer-step">→ Análise de disponibilidade em andamento</div>
            <div class="footer-step">→ Contato em até 24 horas</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="footer-contact">
            <h4>LIV ART STUDIO</h4>
            <p>contato@jairas.dev</p>
            <p>(62) 99999-9999</p>
            <p>Setor Bueno, Goiânia - GO</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
