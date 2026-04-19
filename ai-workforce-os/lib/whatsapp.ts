type SendWhatsAppMessageParams = {
  phoneNumberId: string;
  accessToken: string;
  to: string;
  message: string;
};

export async function sendWhatsAppMessage({
  phoneNumberId,
  accessToken,
  to,
  message,
}: SendWhatsAppMessageParams) {
  const formattedTo = to.replace(/\D/g, "");

  const response = await fetch(
    `https://graph.facebook.com/v23.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: formattedTo,
        type: "text",
        text: {
          body: message,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Erro ao enviar mensagem WhatsApp");
  }

  return data;
}
