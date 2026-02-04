export default function WhatsAppFloat({ waLink }) {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      className="fixed border  border-white bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-green-500 px-5 py-3 text-white shadow-lg hover:opacity-90 active:scale-95 transition"
      aria-label="Chamar no WhatsApp"
      title="Chamar no WhatsApp"
    >
       <i className="fab fa-whatsapp fa-lg"></i>
      <span className="font-semibold">WhatsApp</span>
    </a>
  );
}
