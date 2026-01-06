import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockHelpArticles } from "@/lib/mock-data";

export default function HelpArticle() {
  const { articleId } = useParams<{ articleId: string }>();

  const article = useMemo(() => {
    return mockHelpArticles.find((a) => a.id === articleId);
  }, [articleId]);

  if (!article) {
    return (
      <div className="p-6 space-y-6" data-uf-anchor="help-article-not-found">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/app/help"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Article not found</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              This help article doesn’t exist (or may have been removed).
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6 space-y-6 animate-fade-in"
      data-uf-anchor="help-article-page"
    >
      <div className="max-w-3xl mx-auto space-y-4">
        <Link
          to="/app/help"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          data-uf-anchor="help-article-back"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>

        <Card data-uf-anchor={`help-article-${article.id}`}>
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{article.title}</CardTitle>
                  <div className="mt-2">
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
          </CardHeader>

          <CardContent>
            {/* Render long-form content nicely */}
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              data-uf-anchor="help-article-content"
            >
              {article.information
                .trim()
                .split("\n\n")
                .filter(Boolean)
                .map((para, idx) => (
                  <p key={idx}>{para.trim()}</p>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
