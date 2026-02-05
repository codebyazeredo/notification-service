# Microsserviço de Notificações 

Microserviço de envio de notificações desenvolvido com **NestJS**, utilizando **BullMQ** e **Redis** para processamento assíncrono e desacoplado de mensagens.

Este serviço foi projetado para ser reutilizável, escalável e facilmente integrável a outros sistemas.

---

## Sobre

Este microserviço tem como responsabilidade **orquestrar e processar notificações** através de diferentes canais (ex: e-mail), utilizando filas para garantir:

- Processamento assíncrono
- Maior resiliência
- Desacoplamento entre sistemas
- Facilidade de escalar workers

Ao receber uma requisição, a notificação é adicionada a uma fila e processada por um **worker dedicado**.

---

## Arquitetura

- **NestJS** → Estrutura modular e injeção de dependência
- **BullMQ** → Gerenciamento de filas e jobs
- **Redis** → Backend da fila
- **Workers isolados** → Processamento fora do request HTTP
- **Strategy por canal** → Cada tipo de notificação é tratado por um channel específico

#### Fluxo simplificado:

```

HTTP Request
↓
Controller
↓
Service (enqueue)
↓
BullMQ Queue
↓
Processor
↓
Channel (Email, SMS, Push, etc)

```


## Tecnologias

- Node.js
- NestJS
- BullMQ
- Redis
- TypeScript
- Handlebars (welcome page)

---

## Estrutura

```
src/
├── notification/
│   ├── channels/
│   │   └── email.channel.ts
│   ├── dto/
│   │   └── create-notification.dto.ts
│   ├── interfaces/
│   │   └── notification-job.interface.ts
│   ├── notification.controller.ts
│   ├── notification.service.ts
│   ├── notification.processor.ts
│   └── notification.module.ts
|
├── queue/
│   └── queue.module.ts
│
├── templates/
|   ├── template.service.ts
│   └── welcome.hbs
│
├── app.module.ts
└── main.ts
```

---

## Tipos de Notificação

Atualmente suportado:

- **Email**

A arquitetura permite adicionar novos canais facilmente:

- SMS
- Push Notification
- Webhook
- WhatsApp
- Slack / Discord

Basta criar um novo `channel` e estender o processor.

---

## Endpoint

### Criar notificação

```
POST /notifications
```

#### Payload de exemplo

```
{
  "channel": "email",
  "to": "user@email.com",
  "subject": "Bem-vindo",
  "message": "Sua conta foi criada com sucesso"
}
````

A resposta apenas confirma que a mensagem foi **enfileirada**, não enviada imediatamente.

---

## Processamento Assíncrono

O envio não ocorre durante o request HTTP.

* O Controller apenas valida e envia para a fila
* O Worker consome e processa
* Falhas podem ser reprocessadas
* Evita travar API por lentidão externa (SMTP, APIs, etc)

---

## Health / Welcome

A rota raiz exibe uma página simples (`welcome.hbs`) indicando que:

* O microserviço está ativo
* Qual é sua finalidade
* Onde encontrar o repositório oficial

Útil para:

* Verificação manual
* Ambientes de homologação
* Health checks visuais

---


## Autor

Desenvolvido e mantido por **Matheus de Azeredo**, Desenvolvedor Web Full Stack

GitHub: [https://github.com/codebyazeredo](https://github.com/codebyazeredo)

Contribuições, issues e sugestões são bem-vindas.

