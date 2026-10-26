import { Arrow } from "@/components/icons";

type Variant = "primary" | "dark" | "white" | "ghost";

type Common = {
  variant?: Variant;
  children: React.ReactNode;
  withIcon?: boolean;
  className?: string;
};

type AsLink = Common & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common>;

type AsButton = Common & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof Common>;

export default function Button(props: AsLink | AsButton) {
  const {
    variant = "primary",
    children,
    withIcon = true,
    className = "",
    ...rest
  } = props;

  const cls = `btn btn-${variant} ${className}`.trim();
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      {withIcon && variant !== "ghost" && (
        <span className="btn-ico" aria-hidden>
          <Arrow />
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    // Calendly in een nieuw tabblad: je site blijft open én het klik-event kan
    // versturen voordat er genavigeerd wordt (anders gaat het verloren).
    const ext = props.href.includes("calendly.com")
      ? { target: "_blank", rel: "nofollow noopener noreferrer" }
      : {};
    return (
      <a
        className={cls}
        {...ext}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
