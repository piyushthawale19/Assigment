'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DatabaseTestPage() {
    const [seedResult, setSeedResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const seedDatabase = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/seed', {
                method: 'POST',
            });
            const result = await response.json();
            setSeedResult(result);
        } catch (error) {
            setSeedResult({ error: 'Failed to seed database' });
        } finally {
            setIsLoading(false);
        }
    };

    const testAuth = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                console.log('Current user:', data);
            } else {
                console.log('No user logged in (401 expected)');
            }
        } catch (error) {
            console.error('Auth test error:', error);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                        Database Testing
                    </CardTitle>
                    <CardDescription>
                        Test MongoDB connection and seed sample data
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Button
                            onClick={seedDatabase}
                            disabled={isLoading}
                            className="hover-gradient"
                        >
                            {isLoading ? 'Seeding...' : 'Seed Database'}
                        </Button>
                        <Button
                            onClick={testAuth}
                            variant="outline"
                        >
                            Test Auth
                        </Button>
                    </div>

                    {seedResult && (
                        <Card className="bg-gray-50">
                            <CardContent className="pt-4">
                                <h3 className="font-semibold mb-2">Seed Result:</h3>
                                {seedResult.error ? (
                                    <Badge variant="destructive">Error: {seedResult.error}</Badge>
                                ) : (
                                    <div className="space-y-2">
                                        <Badge variant="default">{seedResult.message}</Badge>
                                        {seedResult.credentials && (
                                            <div className="text-sm space-y-1">
                                                <p><strong>Admin:</strong> {seedResult.credentials.admin}</p>
                                                <p><strong>Users:</strong> {seedResult.credentials.users}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <pre className="text-xs mt-2 p-2 bg-white rounded border">
                                    {JSON.stringify(seedResult, null, 2)}
                                </pre>
                            </CardContent>
                        </Card>
                    )}

                    <div className="text-sm text-muted-foreground">
                        <h4 className="font-semibold">Instructions:</h4>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Click "Seed Database" to populate with sample data</li>
                            <li>Go back to <a href="/login" className="text-purple-600 hover:underline">/login</a></li>
                            <li>Try logging in with: admin@rolevault.com / password</li>
                            <li>Or: john@rolevault.com / password</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}