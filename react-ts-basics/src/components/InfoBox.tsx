import { ReactNode } from "react";

type HintBoxProps = {
  mode: 'info',
  children: ReactNode
};

type WarningBoxProps = {
  mode: 'warning',
  severity: 'low' | 'medium' | 'high'
  children: ReactNode
};

type InfoBoxProps = HintBoxProps | WarningBoxProps;

export default function InfoBox(props : InfoBoxProps) {
  const { mode, children } = props;

  if (mode === "info") {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }

  const { severity } = props;

  return (
    <aside className={`infobox infobox-warning warning--${severity}`}>
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );

}