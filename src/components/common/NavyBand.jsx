function NavyBand({
  eyebrow,
  title,
  body,
  children,
  underline = true,
}) {
  return (
    <section className="navy-band">
      <div className="navy-band-inner">
        {eyebrow ? <span className="eyebrow-label">{eyebrow}</span> : null}
        {title ? <h2>{title}</h2> : null}
        {underline && (eyebrow || title) ? (
          <span className="underline-pill" aria-hidden="true" />
        ) : null}
        {body ? <p>{body}</p> : null}
        {children}
      </div>
    </section>
  );
}

export default NavyBand;
