import { useState } from 'react';
import { Search, BookOpen, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockHelpArticles } from '@/lib/mock-data';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = mockHelpArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(mockHelpArticles.map((a) => a.category))];

  return (
    <div className="p-6 space-y-6 animate-fade-in" data-uf-anchor="help-page">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">Help Center</h1>
        <p className="mt-2 text-muted-foreground">
          Find answers to common questions and learn how to make the most of Flowboard
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto" data-uf-anchor="help-search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-12"
            data-uf-anchor="help-search-input"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2" data-uf-anchor="help-categories">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80"
            onClick={() => setSearchQuery(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Articles */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-uf-anchor="help-articles">
        {filteredArticles.map((article) => (
          <Card
            key={article.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            data-uf-anchor={`help-article-${article.id}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {article.content}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-xs">
                {article.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No articles found matching "{searchQuery}"
          </p>
        </div>
      )}

      {/* Contact Support */}
      <Card className="max-w-2xl mx-auto" data-uf-anchor="contact-support-card">
        <CardHeader className="text-center">
          <CardTitle>Can't find what you're looking for?</CardTitle>
          <CardDescription>
            Our support team is here to help you with any questions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <a
            href="mailto:support@flowboard.io"
            className="text-primary hover:underline"
            data-uf-anchor="email-support"
          >
            Email Support
          </a>
          <span className="text-muted-foreground">•</span>
          <a
            href="#"
            className="text-primary hover:underline"
            data-uf-anchor="live-chat"
          >
            Live Chat
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
