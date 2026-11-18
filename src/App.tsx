import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CheckerPage } from './components/CheckerPage';
import { ResultPage } from './components/ResultPage';
import { LibraryPage } from './components/LibraryPage';
import { CitationPage } from './components/CitationPage';
import { LegalPage } from './components/LegalPage';
import { AssistantPage } from './components/AssistantPage';
import { HeritageRecordsPage } from './components/HeritageRecordsPage';
import { evaluateImageUsage, MATERIAL_LABELS, PURPOSE_LABELS } from './utils/evaluator';
import type {
  CheckHistoryItem,
  CheckWizardInput,
  EvaluationResult,
  HeritageRecord,
  PageView,
} from './types/heritage';

const HISTORY_STORAGE_KEY = 'camnang_check_history_v1';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [checkerPrefill, setCheckerPrefill] = useState<CheckWizardInput | null>(null);
  const [currentCheckInput, setCurrentCheckInput] = useState<CheckWizardInput | null>(null);
  const [currentCheckResult, setCurrentCheckResult] = useState<EvaluationResult | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [citationPrefill, setCitationPrefill] = useState<{
    artifactName?: string;
    custodianName?: string;
    purpose?: string;
  } | null>(null);
  const [assistantContext, setAssistantContext] = useState<string | null>(null);

  const [history, setHistory] = useState<CheckHistoryItem[]>(() => {
    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Ignore storage quota errors
    }
  }, [history]);

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartScenarioInChecker = (prefill: CheckWizardInput) => {
    setCheckerPrefill(prefill);
    navigateTo('checker');
  };

  const handleCheckRecordRights = (record: HeritageRecord) => {
    setCheckerPrefill({
      materialType: record.recommendedMaterialType,
      imageSource: '',
      usagePurpose: '',
      modification: '',
      attributionInfo: '',
      permissionStatus: '',
      permissionScopeStatus: '',
      artifactName: record.name,
      custodianName: record.custodian,
    });
    navigateTo('checker');
  };

  const handleSubmitCheck = (input: CheckWizardInput) => {
    const result = evaluateImageUsage(input);
    setCurrentCheckInput(input);
    setCurrentCheckResult(result);

    const labelMaterial = input.artifactName?.trim() || MATERIAL_LABELS[input.materialType] || 'Tư liệu di sản';
    const labelPurpose = PURPOSE_LABELS[input.usagePurpose] || 'Sử dụng hình ảnh';

    const newItem: CheckHistoryItem = {
      id: `chk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      title: `${labelMaterial} — ${labelPurpose}`,
      input,
      result,
    };

    setHistory((prev) => [newItem, ...prev].slice(0, 20));
    navigateTo('result');
  };

  const handleOpenHistoryItem = (item: CheckHistoryItem) => {
    setCurrentCheckInput(item.input);
    setCurrentCheckResult(item.result);
    setCheckerPrefill(item.input);
    navigateTo('result');
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleOpenArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    navigateTo('library');
  };

  const handleGoToCitation = (prefill: {
    artifactName?: string;
    custodianName?: string;
    purpose?: string;
  }) => {
    setCitationPrefill(prefill);
    navigateTo('citation');
  };

  const handleAskAiWithContext = (contextSummary: string) => {
    setAssistantContext(contextSummary);
    navigateTo('assistant');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onStartScenarioInChecker={handleStartScenarioInChecker}
            onOpenArticle={handleOpenArticle}
          />
        )}

        {currentPage === 'checker' && (
          <CheckerPage
            initialInput={checkerPrefill}
            history={history}
            onSubmitCheck={handleSubmitCheck}
            onOpenHistoryItem={handleOpenHistoryItem}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
          />
        )}

        {currentPage === 'result' && currentCheckInput && currentCheckResult && (
          <ResultPage
            input={currentCheckInput}
            result={currentCheckResult}
            onBackToChecker={() => {
              setCheckerPrefill(currentCheckInput);
              navigateTo('checker');
            }}
            onGoToCitation={handleGoToCitation}
            onAskAiWithContext={handleAskAiWithContext}
          />
        )}

        {currentPage === 'result' && (!currentCheckInput || !currentCheckResult) && (
          <CheckerPage
            initialInput={checkerPrefill}
            history={history}
            onSubmitCheck={handleSubmitCheck}
            onOpenHistoryItem={handleOpenHistoryItem}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
          />
        )}

        {currentPage === 'records' && (
          <HeritageRecordsPage onCheckRecordRights={handleCheckRecordRights} />
        )}

        {currentPage === 'library' && (
          <LibraryPage
            initialArticleId={selectedArticleId}
            onClearInitialArticle={() => setSelectedArticleId(null)}
          />
        )}

        {currentPage === 'citation' && <CitationPage initialPrefill={citationPrefill} />}

        {currentPage === 'legal' && <LegalPage />}

        {currentPage === 'assistant' && (
          <AssistantPage
            attachedContext={assistantContext}
            onClearAttachedContext={() => setAssistantContext(null)}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
