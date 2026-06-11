import { ChevronUp, MessageCircle, MoreHorizontal, Pin, Plus } from "lucide-react";

type CardItem = {
  title: string;
  tag: string;
  tagColor: string;
  pinned?: boolean;
  votes: number;
  comments: number;
};

type Column = {
  title: string;
  accent: string;
  cards: CardItem[];
};

const columns: Column[] = [
  {
    title: "Em análise",
    accent: "bg-slate-400",
    cards: [
      {
        title: "Adicionar login com Google",
        tag: "Feature",
        tagColor: "bg-sky-500",
        votes: 42,
        comments: 8,
      },
      {
        title: "Tema escuro no painel",
        tag: "Sugestão",
        tagColor: "bg-violet-500",
        votes: 27,
        comments: 5,
      },
    ],
  },
  {
    title: "Planejado",
    accent: "bg-amber-400",
    cards: [
      {
        title: "Integração com Slack",
        tag: "Feature",
        tagColor: "bg-sky-500",
        pinned: true,
        votes: 35,
        comments: 12,
      },
    ],
  },
  {
    title: "Em construção",
    accent: "bg-sky-500",
    cards: [
      {
        title: "App mobile trava ao anexar foto",
        tag: "Bug",
        tagColor: "bg-rose-500",
        votes: 18,
        comments: 6,
      },
    ],
  },
  {
    title: "Concluído",
    accent: "bg-emerald-500",
    cards: [
      {
        title: "Filtro por data no relatório",
        tag: "Feature",
        tagColor: "bg-sky-500",
        votes: 21,
        comments: 3,
      },
    ],
  },
];

export function LandingBoardPreview() {
  return (
    <div className="bg-card text-card-foreground shadow-primary/10 relative overflow-hidden rounded-xl border shadow-2xl">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary h-2.5 w-2.5 rounded-full" />
          <span className="bg-muted-foreground/30 h-2.5 w-2.5 rounded-full" />
          <span className="bg-muted-foreground/30 h-2.5 w-2.5 rounded-full" />
          <span className="text-muted-foreground ml-3 text-xs font-medium">Feature Requests</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            <span className="bg-primary text-primary-foreground ring-card flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ring-2">
              AS
            </span>
            <span className="ring-card flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-[10px] font-medium text-white ring-2">
              CS
            </span>
            <span className="ring-card flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-medium text-white ring-2">
              MR
            </span>
          </div>
          <MoreHorizontal className="text-muted-foreground h-4 w-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title} className="bg-muted/40 flex flex-col gap-3 rounded-lg p-2.5">
            <div className="flex items-center justify-between px-1.5">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${col.accent}`} />
                <h3 className="text-xs font-semibold tracking-wide uppercase">{col.title}</h3>
                <span className="text-muted-foreground bg-background rounded-full px-1.5 py-0.5 text-[10px] font-medium">
                  {col.cards.length}
                </span>
              </div>
              <MoreHorizontal className="text-muted-foreground h-3.5 w-3.5" />
            </div>

            <div className="flex flex-col gap-2">
              {col.cards.map((card) => (
                <div
                  key={card.title}
                  className="bg-card border-border/60 hover:border-primary/40 rounded-md border p-3 shadow-xs transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-foreground text-xs leading-snug font-medium">{card.title}</p>
                    {card.pinned && <Pin className="h-3.5 w-3.5 shrink-0 fill-amber-300 text-amber-300" />}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium text-white ${card.tagColor}`}>
                      {card.tag}
                    </span>
                    <div className="text-muted-foreground flex items-center gap-2.5 text-[10px]">
                      <span className="flex items-center gap-1">
                        <ChevronUp className="h-3 w-3" />
                        {card.votes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {card.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="text-muted-foreground hover:text-foreground hover:bg-background/60 flex items-center justify-center gap-1.5 rounded-md border border-dashed py-1.5 text-[10px] font-medium transition-colors"
              >
                <Plus className="h-3 w-3" />
                Enviar feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
