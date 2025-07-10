import React from 'react';

type JsonDebuggerProps = {
  data: unknown;
  title?: string;
  collapsed?: boolean;
};

export const JsonDebugger: React.FC<JsonDebuggerProps> = ({ data, title = 'Debug', collapsed = false }) => {
  const jsonString = JSON.stringify(data, null, 2);

  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      fontFamily: 'monospace',
      padding: '1rem',
      borderRadius: '8px',
      whiteSpace: 'pre-wrap',
      fontSize: '0.875rem',
      overflowX: 'auto',
    }}>
      <details open={!collapsed}>
        <summary style={{ cursor: 'pointer', marginBottom: '1rem', color: '#569CD6' }}>{title}</summary>
        <pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(jsonString) }} />
      </details>
    </div>
  );
};

// Função para colorir o JSON como no VS Code
function syntaxHighlight(json: string): string {

  console.log(json);
  if (json === undefined || json === null) return 'Nenhum dado encontrado';

  return json.replace(/("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g, match => {
    let color = '#CE9178'; // string padrão

    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        color = '#9CDCFE'; // chave
      }
    } else if (/true|false/.test(match)) {
      color = '#569CD6'; // boolean
    } else if (/null/.test(match)) {
      color = '#B5CEA8'; // null
    } else {
      color = '#B5CEA8'; // number
    }

    return `<span style="color: ${color}">${match}</span>`;
  });
}
